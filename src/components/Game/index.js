import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pipeActions } from '../../store/pipe';
import { birdActions } from '../../store/bird';
import game, { gameActions } from '../../store/game';
import styled, { keyframes } from 'styled-components';
import bg from './bg.png';

import Obstacles from '../Obstacles';
import Bird from '../Bird';
import store from '../../store';

const animatedBackground = keyframes`
    from {
      background-position: 0 0;
    }
    to {
      background-position: 1000% 0;
    }
`;

const Wrapper = styled.div`
  border: 1px solid #a09f9f;
  width: 801px;
  height: 601px;
  background-color: aqua;
  margin: auto;
  position: relative;
  background-image: url(${bg});
  background-repeat: repeat-x;
  animation: ${animatedBackground} ${(props) => props.duration}s linear infinite;
`;

function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

export default function Game() {
  const [animationTime, setAnimationTime] = useState(0);
  const [newPipeId, setNewPipeId] = useState('');
  const [shiftingPipeId, setShiftingPipeId] = useState('');
  const [increaseScoreId, setIncreaseScoreId] = useState('');
  const dispatch = useDispatch();

  //redux states
  const birdPos = useSelector((state) => state.bird.top);
  const gameStatus = useSelector((state) => state.game.status);

  const isVital = () => {
    const pipes = store.getState().pipe.pipes;
    const birdPos = store.getState().bird.top;

    if (birdPos >= 530) {
      //hit the ground
      return false;
    }

    if (pipes && pipes.length) {
      const { height, left } = pipes[0];

      const hit = birdPos < height || birdPos > height + 130;
      if (left <= 98 && hit) {
        //hit the pipe
        return false;
      }
    }

    return true;
  };

  function handleKeypress(e) {
    if (e.code === 'Space') {
      dispatch(birdActions.fly());
    }
  }

  function handleGameStatus(status) {
    switch (status) {
      case 'STARTED':
        startGame();
        break;

      case 'PAUSE':
        pauseGame();
        break;

      case 'REPLAY':
        replay();
        break;

      case 'IDLE':
        break;

      case 'GAME_OVER':
        break;

      default:
        console.log('Not match');
    }
  }

  function startGame() {
    //adding new pipes
    const newPipeId = setInterval(() => {
      const randomHeight = generateRandomInteger(50, 400);
      dispatch(
        pipeActions.addPipe({
          height: randomHeight,
          left: 750,
        })
      );
    }, 8000);
    setNewPipeId(newPipeId);
    setAnimationTime(40);

    //shifting pipes, bird falling
    const shiftingPipeId = setInterval(() => {
      dispatch(pipeActions.shiftPipes());
      dispatch(birdActions.fall());
      const vital = isVital();
      if (!vital) {
        console.log('Game over');
        gameOver();
      }
    }, 100);
    setShiftingPipeId(shiftingPipeId);

    //score increasing
    const increaseScoreId = setInterval(() => {
      dispatch(gameActions.setCurrentScore(10));
    }, 1000);
    setIncreaseScoreId(increaseScoreId);
  }

  function pauseGame() {
    clearInterval(newPipeId);
    clearInterval(shiftingPipeId);
    clearInterval(increaseScoreId);
    setNewPipeId('');
    setShiftingPipeId('');
    setIncreaseScoreId('');
    setAnimationTime(0);
  }

  function gameOver() {
    dispatch(gameActions.setStatus('PAUSE'));
    const currentScore = store.getState().game.currentScore;
    dispatch(gameActions.setHighestScore(currentScore));
    dispatch(gameActions.setStatus('GAME_OVER'));
  }

  function replay() {
    //clear all the pipes
    dispatch(pipeActions.clearPipes());
    //reset bird position
    dispatch(birdActions.reset());
    //reset score
    dispatch(gameActions.resetScore());
    dispatch(gameActions.setStatus('IDLE'));
  }

  // when the game component is rendered
  useEffect(() => {
    //register click event
    document.addEventListener('keypress', (e) => handleKeypress(e));
  }, []);

  //Changes according to game status
  useEffect(() => {
    handleGameStatus(gameStatus);
  }, [gameStatus]);

  return (
    <Wrapper duration={animationTime}>
      <Bird top={birdPos} />
      <Obstacles />
    </Wrapper>
  );
}

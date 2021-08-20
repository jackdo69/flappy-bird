import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pipeActions } from '../../store/pipe';
import { birdActions } from '../../store/bird';
import './style.css';

import Obstacles from '../Obstacles';
import Bird from '../Bird';

function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

export default function Game() {
  const dispatch = useDispatch();
  const birdPos = useSelector((state) => state.bird.top);

  function handleKeypress(e) {
    if (e.code === 'Space') {
      dispatch(birdActions.fly());
    }
  }

  // when the game component is rendered
  useEffect(() => {
    //register click event
    document.addEventListener('keypress', (e) => handleKeypress(e));
    setInterval(() => {
      const randomHeight = generateRandomInteger(50, 400);
      dispatch(
        pipeActions.addPipe({
          height: randomHeight,
          left: 750,
        })
      );
    }, 8000);

    setInterval(() => {
      dispatch(pipeActions.shiftPipes());
      dispatch(birdActions.fall());
    }, 100);
  }, []);

  return (
    <div className='Game'>
      <Bird top={birdPos} />
      <Obstacles />
    </div>
  );
}

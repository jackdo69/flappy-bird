import React, { useState, useEffect } from 'react';
import './style.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { gameActions } from '../../store/game';

function useCustomButton(action, text, variant) {
  const dispatch = useDispatch();
  return (
    <Button
      style={{
        margin: '1em',
      }}
      size='lg'
      variant={variant}
      onClick={(e) => {
        e.currentTarget.blur();
        dispatch(gameActions.setStatus(action));
      }}
    >
      {text}
    </Button>
  );
}

export default function Board() {
  const [helpText, setHelpText] = useState('');
  const currentScore = useSelector((state) => state.game.currentScore);
  const highestScore = useSelector((state) => state.game.highestScore);
  const status = useSelector((state) => state.game.status);

  const playButton = useCustomButton('STARTED', 'Play', 'success');
  const pauseButton = useCustomButton('PAUSE', 'Pause', 'warning');
  const resumeButton = useCustomButton('STARTED', 'Resume', 'success');
  const replayButton = useCustomButton('REPLAY', 'Replay', 'info');

  let renderedButtons;
  useEffect(() => {
    if (status === 'STARTED') {
      setHelpText('Press SPACE button for the bird to fly ^^');
    } else {
      setHelpText('');
    }
  }, [status]);
  switch (status) {
    case 'IDLE':
      renderedButtons = <div>{playButton}</div>;
      break;

    case 'STARTED':
      renderedButtons = (
        <div>
          {pauseButton}
          {replayButton}
        </div>
      );
      break;

    case 'PAUSE':
      renderedButtons = (
        <div>
          {resumeButton}
          {replayButton}
        </div>
      );
      break;

    case 'REPLAY':
      break;

    case 'GAME_OVER':
      renderedButtons = <div>{replayButton}</div>;
      break;

    default:
      console.log('Not matched');
  }

  return (
    <div className='Wrapper'>
      <Container>
        <Row>
          <Col>
            <h4>Current Score: {currentScore}</h4>
          </Col>
          <Col>
            <h4>Highest Score: {highestScore}</h4>
          </Col>
        </Row>
        <Row>{renderedButtons}</Row>
        <Row>
          <div className='HelpText'>{helpText}</div>
        </Row>
      </Container>
    </div>
  );
}

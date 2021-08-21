import React from 'react';
import './style.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { gameActions } from '../../store/game';

export default function Board() {
  const dispatch = useDispatch();
  const currentScore = useSelector((state) => state.game.currentScore);
  const highestScore = useSelector((state) => state.game.highestScore);
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
        <Row>
          <Col>
            <Button onClick={() => dispatch(gameActions.setStatus('STARTED'))}>
              Play
            </Button>
          </Col>
          <Col>
            <Button onClick={() => dispatch(gameActions.setStatus('PAUSE'))}>
              Pause
            </Button>
          </Col>
          <Col>
            <Button onClick={() => dispatch(gameActions.setStatus('REPLAY'))}>
              Replay
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

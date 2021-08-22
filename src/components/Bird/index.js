import './style.css';
import bird from './bird.png';
import bird_die from './bird_die.png';
import store from '../../store';
import { useEffect, useState } from 'react';

function Bird({ top }) {
  const gameStatus = store.getState().game.status;
  const isFlying = store.getState().bird.isFlying;
  let angle;
  isFlying ? (angle = -40) : (angle = 0);
  const [img, setImg] = useState(bird);

  useEffect(() => {
    if (gameStatus === 'GAME_OVER') {
      setImg(bird_die);
    } else {
      setImg(bird);
    }
  }, [gameStatus]);

  return (
    <div
      className='Bird'
      style={{
        top: top,
        backgroundImage: `url(${img})`,
        transform: `rotate(${angle}deg)`,
        transitionDuration: '0.1s',
      }}
    ></div>
  );
}

export default Bird;

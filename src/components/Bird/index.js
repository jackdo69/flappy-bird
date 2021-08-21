import './style.css';
import bird from './bird.png';
import bird_die from './bird_die.png';
import store from '../../store';
import { useEffect, useState } from 'react';

function Bird({ top }) {
  const gameStatus = store.getState().game.status;
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
      }}
    ></div>
  );
}

export default Bird;

import './style.css';
import img from './bird.png';

function Bird({ top }) {
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

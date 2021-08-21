import './style.css';
import bg from './pipeTop.png';

export default function PipeTop({ height, left }) {
  return (
    <div
      className='Pipe'
      style={{
        height: height,
        left: left,
        backgroundImage: `url(${bg})`,
        backgroundPosition: 'bottom',
      }}
    ></div>
  );
}

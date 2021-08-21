import './style.css';
import bg from './pipeBottom.png';

export default function PipeBottom({ height, left }) {
  return (
    <div
      className='Pipe'
      style={{
        height: 400 - height,
        top: height + 200,
        left: left,
        backgroundImage: `url(${bg})`,
      }}
    ></div>
  );
}

import './style.css';

export default function PipeTop({ height, left }) {
  return (
    <div
      className='Pipe'
      style={{
        height: height,
        left: left,
      }}
    ></div>
  );
}

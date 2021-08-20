import './style.css';

export default function PipeBottom({ height, left }) {
  return (
    <div
      className='Pipe'
      style={{
        height: 400 - height,
        top: height + 200,
        left: left,
      }}
    ></div>
  );
}

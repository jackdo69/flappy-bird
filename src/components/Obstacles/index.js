import PipeTop from './PipeTop';
import PipeBottom from './PipeBottom';
import { useSelector } from 'react-redux';

export default function Obstacles() {
  const pipes = useSelector((state) => state.pipe.pipes);

  const renderedPipes = pipes.map(({ height, left }) => {
    return (
      <div
        key={Math.random()}
        style={{
          position: 'relative',
        }}
      >
        <PipeTop height={height} left={left} />
        <PipeBottom height={height} left={left} />
      </div>
    );
  });
  return <div>{renderedPipes}</div>;
}

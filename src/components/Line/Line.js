import './line.css';

const Line = ({ startPoint, endPoint, color, onClick }) => {
  return (
    <div
      className="line"
      style={{
        width: `${endPoint}px`,
        marginLeft: `${startPoint}px`,
        background: color,
      }}
      onClick={onClick}
    />
  );
};

export default Line;

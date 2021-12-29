import { useRunGame } from "./hooks";

import "./Game.css";

function Game() {
  const { snakePosition, foodPosition } = useRunGame();

  return (
    <div className="gameArea">
      {snakePosition.map(({ x, y }) => (
        <div
          style={{
            top: `${y}rem`,
            left: `${x}rem`,
          }}
          className="snakeSegment"
        />
      ))}
      <div
        style={{
          top: `${foodPosition.y}rem`,
          left: `${foodPosition.x}rem`,
        }}
        className="snakeFood"
      ></div>
    </div>
  );
}

export default Game;

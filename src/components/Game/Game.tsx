import cx from "classnames";
import { useRunGame } from "./hooks";

import "./Game.css";

type Props = {
  hasGameStarted: boolean;
  isGamePaused: boolean;
  setIsGameOver: (isGameOver: boolean) => void;
};

function Game({ hasGameStarted, isGamePaused, setIsGameOver }: Props) {
  const { snakePosition, foodPosition } = useRunGame(
    hasGameStarted,
    isGamePaused,
    setIsGameOver
  );

  return (
    <div
      className={cx("gameArea", {
        ["gameStopped"]: !hasGameStarted || isGamePaused,
      })}
    >
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

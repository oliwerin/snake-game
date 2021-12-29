import cx from "classnames";
import { useRunGame } from "./hooks";

import "./Game.css";
import { GAME_AREA_SIZE } from "../../constants/constants";

type Props = {
  hasGameStarted: boolean;
  isGamePaused: boolean;
  setIsGameOver: (isGameOver: boolean) => void;
  setScore: (isGameOver: number) => void;
};

function Game({
  hasGameStarted,
  isGamePaused,
  setIsGameOver,
  setScore,
}: Props) {
  const { snakePosition, foodPosition } = useRunGame(
    hasGameStarted,
    isGamePaused,
    setIsGameOver,
    setScore
  );

  return (
    <div
      className={cx("gameArea", {
        ["gameStopped"]: !hasGameStarted || isGamePaused,
      })}
    >
      {[...Array(GAME_AREA_SIZE).keys()].map((_, x) => (
        <>
          {[...Array(GAME_AREA_SIZE).keys()].map((_, y) =>
            snakePosition.find(
              (position) => position.x === x && position.y === y
            ) === undefined ? (
              <div
                style={{
                  top: `${y}rem`,
                  left: `${x}rem`,
                }}
                className="boardSegment"
              />
            ) : null
          )}
        </>
      ))}
      {/* {snakePosition.map(({ x, y }) => (
        <div
          style={{
            top: `${y}rem`,
            left: `${x}rem`,
          }}
          className="snakeSegment"
        />
      ))} */}
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

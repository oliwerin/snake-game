import { Fragment } from "react";
import cx from "classnames";

import { PointType, SnakePositionType } from "../../types/types";
import { GAME_AREA_SIZE } from "../../constants/constants";

import "./GameArea.css";

type Props = {
  isGameStopped: boolean;
  snakePosition: SnakePositionType;
  foodPosition: PointType | null;
};

function GameArea({ isGameStopped, snakePosition, foodPosition }: Props) {
  return (
    <div
      className={cx("gameArea", {
        ["gameStopped"]: isGameStopped,
      })}
    >
      {[...Array(GAME_AREA_SIZE).keys()].map((_, x) => (
        <Fragment key={`id-${x}`}>
          {[...Array(GAME_AREA_SIZE).keys()].map((_, y) =>
            snakePosition.find(
              (position) => position.x === x && position.y === y
            ) === undefined ? (
              <div
                key={`id-${x}-${y}`}
                style={{
                  top: `${y}rem`,
                  left: `${x}rem`,
                }}
                className="boardSegment"
              />
            ) : null
          )}
        </Fragment>
      ))}
      {foodPosition && (
        <div
          style={{
            top: `${foodPosition.y}rem`,
            left: `${foodPosition.x}rem`,
          }}
          className="snakeFood"
        />
      )}
    </div>
  );
}

export default GameArea;

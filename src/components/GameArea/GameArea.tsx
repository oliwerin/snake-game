import { Fragment } from "react";
import cx from "classnames";

import { Point, SnakePosition } from "../../types/types";
import { GAME_AREA_SIZE } from "../../constants/constants";
import { doesSnakePositionContainPoint } from "../../utils/utils";

import "./GameArea.css";

type Props = {
  isGameStopped: boolean;
  snakePosition: SnakePosition;
  foodPosition: Point | null;
};

function GameArea({ isGameStopped, snakePosition, foodPosition }: Props) {
  return (
    <div
      className={cx("gameArea", {
        ["gameStopped"]: isGameStopped,
      })}
    >
      {/* Todo: optimise the number of rendered elements */}
      {[...Array(GAME_AREA_SIZE).keys()].map((_, x) => (
        <Fragment key={`id-${x}`}>
          {[...Array(GAME_AREA_SIZE).keys()].map((_, y) =>
            !doesSnakePositionContainPoint(snakePosition, { x, y }) ? (
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

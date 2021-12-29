import { useEffect, useState } from "react";

import {
  PointType,
  SnakeDirection,
  SnakePositionType,
} from "./../../types/types";

import {
  REFRESH_RATE_MS,
  SNAKE_STARTING_DIRECTION,
  SNAKE_STARTING_POSITION,
} from "./../../constants/constants";

import {
  getRandomFoodPosition,
  getUpdatedXHeadCoordinate,
  getUpdatedYHeadCoordinate,
  isGameOver,
} from "./utils";

let snakeDirection = SNAKE_STARTING_DIRECTION;
let hasSnakeDirectionChanged = false;

const useArrowKeys = () => {
  useEffect(() => {
    document.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "ArrowUp":
          if (
            snakeDirection !== SnakeDirection.Up &&
            !hasSnakeDirectionChanged
          ) {
            snakeDirection = SnakeDirection.Down;
            hasSnakeDirectionChanged = true;
          }
          break;
        case "ArrowRight":
          if (
            snakeDirection !== SnakeDirection.Left &&
            !hasSnakeDirectionChanged
          ) {
            snakeDirection = SnakeDirection.Right;
            hasSnakeDirectionChanged = true;
          }
          break;
        case "ArrowDown":
          if (
            snakeDirection !== SnakeDirection.Down &&
            !hasSnakeDirectionChanged
          ) {
            snakeDirection = SnakeDirection.Up;
            hasSnakeDirectionChanged = true;
          }
          break;
        case "ArrowLeft":
          if (
            snakeDirection !== SnakeDirection.Right &&
            !hasSnakeDirectionChanged
          ) {
            snakeDirection = SnakeDirection.Left;
            hasSnakeDirectionChanged = true;
          }
          break;
        default:
      }
    });
  }, []);
};

export const useRunGame = (
  hasGameStarted: boolean,
  isGamePaused: boolean,
  setIsGameOver: (isGameOver: boolean) => void
) => {
  const [snakePosition, setSnakePosition] = useState<SnakePositionType>([
    SNAKE_STARTING_POSITION,
  ]);

  const [foodPosition, setFoodPosition] = useState<PointType>(
    getRandomFoodPosition(snakePosition)
  );

  useArrowKeys();

  useEffect(() => {
    if (hasGameStarted) {
      setSnakePosition([SNAKE_STARTING_POSITION]);
      setFoodPosition(getRandomFoodPosition(snakePosition));
    }
  }, [hasGameStarted]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hasGameStarted || isGamePaused) {
        return;
      }

      const [snakeHeadPosition] = snakePosition;

      const nextSnakeHeadPosition = {
        x: getUpdatedXHeadCoordinate(snakeHeadPosition.x, snakeDirection),
        y: getUpdatedYHeadCoordinate(snakeHeadPosition.y, snakeDirection),
      };

      if (isGameOver(nextSnakeHeadPosition, snakePosition)) {
        setIsGameOver(true);
        return clearInterval(interval);
      }

      if (
        nextSnakeHeadPosition.x === foodPosition.x &&
        nextSnakeHeadPosition.y === foodPosition.y
      ) {
        setSnakePosition([nextSnakeHeadPosition, ...snakePosition]);

        setFoodPosition(getRandomFoodPosition(snakePosition));
      } else {
        setSnakePosition([
          nextSnakeHeadPosition,
          ...snakePosition
            .filter((_position, index) => index !== 0)
            .map((_position, index) => snakePosition[index]),
        ]);
      }

      hasSnakeDirectionChanged = false;
    }, REFRESH_RATE_MS);

    return () => {
      clearInterval(interval);
    };
  }, [snakePosition, hasGameStarted, isGamePaused]);

  return { snakePosition, foodPosition };
};

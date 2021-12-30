import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

import { PointType, SnakeDirection, SnakePositionType } from "../types/types";

import {
  REFRESH_RATE_MS,
  SNAKE_STARTING_DIRECTION,
  SNAKE_STARTING_POSITION,
} from "../constants/constants";

import {
  getNextSnakePosition,
  getRandomFoodPosition,
  getNextSnakeHeadXCoordinate,
  getNextSnakeHeadYCoordinate,
  isGameOver,
} from "../utils/utils";

let snakeDirection = SNAKE_STARTING_DIRECTION;
let hasSnakeDirectionChanged = false;

const handleDirectionChangeToUp = () => {
  if (snakeDirection !== SnakeDirection.Up && !hasSnakeDirectionChanged) {
    snakeDirection = SnakeDirection.Down;
    hasSnakeDirectionChanged = true;
  }
};

const handleDirectionChangeToDown = () => {
  if (snakeDirection !== SnakeDirection.Down && !hasSnakeDirectionChanged) {
    snakeDirection = SnakeDirection.Up;
    hasSnakeDirectionChanged = true;
  }
};

const handleDirectionChangeToRight = () => {
  if (snakeDirection !== SnakeDirection.Left && !hasSnakeDirectionChanged) {
    snakeDirection = SnakeDirection.Right;
    hasSnakeDirectionChanged = true;
  }
};

const handleDirectionChangeToLeft = () => {
  if (snakeDirection !== SnakeDirection.Right && !hasSnakeDirectionChanged) {
    snakeDirection = SnakeDirection.Left;
    hasSnakeDirectionChanged = true;
  }
};

const handleKeyboard = (event: KeyboardEvent) => {
  switch (event.key) {
    case "ArrowUp":
      handleDirectionChangeToUp();
      break;
    case "ArrowDown":
      handleDirectionChangeToDown();
      break;
    case "ArrowRight":
      handleDirectionChangeToRight();
      break;
    case "ArrowLeft":
      handleDirectionChangeToLeft();
      break;
    default:
  }
};

export const useKeyboard = () => {
  useEffect(() => {
    document.addEventListener("keyup", handleKeyboard);

    return () => {
      document.removeEventListener("keyup", handleKeyboard);
    };
  }, []);
};

export const useRunGame = () => {
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const isGameStopped = !hasGameStarted || isGamePaused;

  const [snakePosition, setSnakePosition] = useState<SnakePositionType>([
    SNAKE_STARTING_POSITION,
  ]);

  const [foodPosition, setFoodPosition] = useState<PointType | null>(null);

  useKeyboard();

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => handleDirectionChangeToUp(),
    onSwipedDown: () => handleDirectionChangeToDown(),
    onSwipedRight: () => handleDirectionChangeToRight(),
    onSwipedLeft: () => handleDirectionChangeToLeft(),
  });

  useEffect(() => {
    if (hasGameStarted) {
      setSnakePosition([SNAKE_STARTING_POSITION]);
      setFoodPosition(getRandomFoodPosition(snakePosition));
      snakeDirection = SNAKE_STARTING_DIRECTION;
    }
  }, [hasGameStarted]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isGameStopped) {
        return;
      }

      const [snakeHeadPosition] = snakePosition;

      const nextSnakeHeadPosition = {
        x: getNextSnakeHeadXCoordinate(snakeHeadPosition.x, snakeDirection),
        y: getNextSnakeHeadYCoordinate(snakeHeadPosition.y, snakeDirection),
      };

      if (isGameOver(nextSnakeHeadPosition, snakePosition)) {
        setHasGameStarted(false);
        clearInterval(interval);
        return;
      }

      const isFoodEatenBySnake =
        nextSnakeHeadPosition.x === foodPosition?.x &&
        nextSnakeHeadPosition.y === foodPosition?.y;

      if (isFoodEatenBySnake) {
        setSnakePosition([nextSnakeHeadPosition, ...snakePosition]);
        setFoodPosition(getRandomFoodPosition(snakePosition));
      } else {
        const nextSnakePosition = getNextSnakePosition(
          nextSnakeHeadPosition,
          snakePosition
        );

        setSnakePosition(nextSnakePosition);
      }

      hasSnakeDirectionChanged = false;
    }, REFRESH_RATE_MS);

    return () => {
      clearInterval(interval);
    };
  }, [snakePosition, isGameStopped]);

  return {
    hasGameStarted,
    isGamePaused,
    isGameStopped,
    snakePosition,
    foodPosition,
    swipeHandlers,
    setHasGameStarted,
    setIsGamePaused,
  };
};

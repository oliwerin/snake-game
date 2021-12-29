import { GAME_AREA_SIZE } from "../../constants/constants";
import {
  PointType,
  SnakeDirection,
  SnakePositionType,
} from "../../types/types";

export const getUpdatedXHeadCoordinate = (
  x: number,
  snakeDirection: SnakeDirection
) => {
  if (snakeDirection === SnakeDirection.Right) {
    return x + 1;
  }

  if (snakeDirection === SnakeDirection.Left) {
    return x - 1;
  }

  return x;
};

export const getUpdatedYHeadCoordinate = (
  y: number,
  snakeDirection: SnakeDirection
) => {
  if (snakeDirection === SnakeDirection.Up) {
    return y + 1;
  }

  if (snakeDirection === SnakeDirection.Down) {
    return y - 1;
  }

  return y;
};

const getRandomInt = () => Math.floor(Math.random() * (GAME_AREA_SIZE - 1));

const doesSnakePositionContainX = (
  snakePosition: SnakePositionType,
  x: number
) => snakePosition.find((position) => position.x === x) !== undefined;

const doesSnakePositionContainY = (
  snakePosition: SnakePositionType,
  y: number
) => snakePosition.find((position) => position.y === y) !== undefined;

export const getRandomFoodPosition = (snakePosition: SnakePositionType) => {
  let x: number;
  let y: number;

  do {
    x = getRandomInt();
    y = getRandomInt();
  } while (
    doesSnakePositionContainX(snakePosition, x) &&
    doesSnakePositionContainY(snakePosition, y)
  );

  return { x, y };
};

export const isGameOver = (
  nextSnakeHeadPosition: PointType,
  snakePosition: SnakePositionType
) => {
  const didSnakeHitItself =
    snakePosition.find(
      (position) =>
        position.x === nextSnakeHeadPosition.x &&
        position.y === nextSnakeHeadPosition.y
    ) !== undefined;

  const didSnakeHitGameAreaBorder =
    nextSnakeHeadPosition.x === GAME_AREA_SIZE ||
    nextSnakeHeadPosition.y === GAME_AREA_SIZE ||
    nextSnakeHeadPosition.x === -1 ||
    nextSnakeHeadPosition.y === -1;

  return didSnakeHitItself || didSnakeHitGameAreaBorder;
};

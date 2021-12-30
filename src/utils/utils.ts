import { GAME_AREA_SIZE } from "../constants/constants";
import { PointType, SnakeDirection, SnakePositionType } from "../types/types";

export const getNextSnakeHeadXCoordinate = (
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

export const getNextSnakeHeadYCoordinate = (
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

export const doesSnakePositionContainPoint = (
  snakePosition: SnakePositionType,
  point: PointType
) =>
  snakePosition.find(
    (position) => position.x === point.x && position.y === point.y
  ) !== undefined;

const getRandomInt = () => Math.floor(Math.random() * (GAME_AREA_SIZE - 1));

export const getRandomFoodPosition = (snakePosition: SnakePositionType) => {
  let x: number;
  let y: number;

  do {
    x = getRandomInt();
    y = getRandomInt();
  } while (doesSnakePositionContainPoint(snakePosition, { x, y }));

  return { x, y };
};

export const isGameOver = (
  nextSnakeHeadPosition: PointType,
  snakePosition: SnakePositionType
) => {
  const didSnakeHitItself = doesSnakePositionContainPoint(
    snakePosition,
    nextSnakeHeadPosition
  );

  const didSnakeHitGameAreaBorder =
    nextSnakeHeadPosition.x === GAME_AREA_SIZE ||
    nextSnakeHeadPosition.y === GAME_AREA_SIZE ||
    nextSnakeHeadPosition.x === -1 ||
    nextSnakeHeadPosition.y === -1;

  return didSnakeHitItself || didSnakeHitGameAreaBorder;
};

export const getNextSnakePosition = (
  nextSnakeHeadPosition: PointType,
  snakePosition: SnakePositionType
) => [
  nextSnakeHeadPosition,
  ...snakePosition
    .filter((_position, index) => index !== 0)
    .map((_position, index) => snakePosition[index]),
];

export type Point = {
  x: number;
  y: number;
};

export type SnakePosition = Point[];

export enum SnakeDirection {
  Up = "up",
  Right = "right",
  Down = "down",
  Left = "left",
}

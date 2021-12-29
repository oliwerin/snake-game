export type PointType = {
  x: number;
  y: number;
};

export type SnakePositionType = PointType[];

export enum SnakeDirection {
  Up = "up",
  Right = "right",
  Down = "down",
  Left = "left",
}

import { Keys } from "excalibur";

export const GAME_WIDTH = 640;
export const GAME_HEIGHT = 480;

export const GAME_CONTROLS = {
  MOVE_LEFT: [Keys.A, Keys.Left],
  MOVE_RIGHT: [Keys.D, Keys.Right],
  JUMP: [Keys.ShiftLeft, Keys.ShiftRight, Keys.Space],
  SHOOT: [Keys.ControlRight, Keys.ControlLeft],
  ROLL: [Keys.Z, Keys.Enter],
};

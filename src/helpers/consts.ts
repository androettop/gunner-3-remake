import { Keys } from "excalibur";

export const GAME_WIDTH = 640;
export const GAME_HEIGHT = 480;
export const WEAPONS_COUNT = 22;

export const GAME_CONTROLS = {
  MOVE_LEFT: [Keys.Left],
  MOVE_RIGHT: [Keys.Right],
  AIM_UP: [Keys.Up],
  AIM_DOWN: [Keys.Down],
  JUMP: [Keys.ShiftLeft, Keys.ShiftRight, Keys.Space],
  SHOOT: [Keys.ControlRight, Keys.ControlLeft],
  ROLL: [Keys.Z, Keys.Enter],
  WEAPON_SWITCH: [
    [Keys.Digit1],
    [Keys.Digit2],
    [Keys.Digit3],
    [Keys.Digit4],
    [Keys.Digit5],
    [Keys.Digit6],
    [Keys.Digit7],
    [Keys.Digit8],
    [Keys.Digit9],
    [Keys.Digit0],
    [Keys.Q],
    [Keys.W],
    [Keys.E],
    [Keys.R],
    [Keys.T],
    [Keys.Y],
    [Keys.U],
    [Keys.I],
    [Keys.O],
    [Keys.P],
    [Keys.A],
    [Keys.S],
  ],
};

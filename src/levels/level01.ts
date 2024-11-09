import { Level } from "./types";

export const level01: Level = {
  player: {
    x: 100,
    y: 100,
    width: 64,
    height: 64,
    type: "player",
    properties: {
      activeWeapon: 0,
      health: 10,
      weapons: [0, 1],
    },
  },
  layers: [
    [],
    [
      {
        type: "ground",
        x: 0,
        y: 300,
        width: 256,
        height: 192,
        properties: {
          type: "green-grass",
        },
      },
      {
        type: "ground",
        x: 384,
        y: 300 - 64,
        width: 256,
        height: 256,
        properties: {
          type: "green-grass",
        },
      },
    ],
  ],
};

import { Level } from "./types";

export const level01: Level = {
  layers: [
    {
      name: "bg",
      entities: [],
      parallax: 0,
    },
    {
      name: "ground",
      parallax: 0,
      entities: [
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
          x: 256,
          y: 236,
          width: 192,
          height: 256,
          properties: {
            type: "green-grass",
          },
        },

        {
          type: "ground",
          x: 512,
          y: 236,
          width: 64,
          height: 256,
          properties: {
            type: "green-grass",
          },
        },
      ],
    },
    {
      name: "npcs",
      parallax: 0,
      entities: [
        {
          type: "enemy-soldier",
          x: 400,
          y: 240,
          properties: {
            health: 10,
          },
        },
        {
          type: "player",
          x: 50,
          y: 240,
          properties: {
            health: 10,
          },
        },
      ],
    },
  ],
};

import { Color } from "excalibur";
import { SoundResources } from "../actors/sounds/resources";
import { Level } from "./types";
import levelSceneFactory from "./level_factory";

export const level01: Level = {
  backgroundColor: Color.fromHex("639ADE"),
  music: SoundResources.Level01Music,
  layers: [
    {
      name: "bg",
      entities: [
        {
          type: "background",
          y: 0,
          x: 0,
          width: 24 * 64,
          height: 10 * 64,
          properties: {
            type: "jungle",
          },
        },
      ],
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
          type: "trigger",
          x: 512 - 64,
          y: 236 + 64 * 4,
          width: 64,
          height: 64,
          properties: {
            type: "fall-death",
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
            health: 5,
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

const Level01 = levelSceneFactory(level01);

export default Level01;

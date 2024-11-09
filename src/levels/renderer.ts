import { Scene } from "excalibur";
import EnemySoldier from "../actors/enemies/enemy_soldier";
import Ground from "../actors/world/ground";
import { Level } from "./types";
import Player from "../actors/player/player";

export const initLevel = (level: Level, scene: Scene) => {
  // Add layers
  level.layers.forEach((layer) => {
    layer.entities.forEach((entity) => {
      switch (entity.type) {
        case "ground":
          scene.add(new Ground(entity));
          break;
        case "enemy-soldier":
          scene.add(new EnemySoldier(entity));
          break;
        case "player":
          scene.add(new Player(entity));
          break;
        default:
          break;
      }
    });
  });
};

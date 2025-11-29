import { Scene, vec } from "excalibur";
import EnemySoldier from "../actors/enemies/enemy_soldier";
import Ground from "../actors/world/ground";
import { Level } from "./types";
import Player from "../actors/player/player";
import FallDeathTrigger from "../actors/world/fall_death_trigger";

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
        case "trigger":
          const { properties, type, x, y, ...triggerConfig } = entity;
          switch (properties.type) {
            case "fall-death":
              scene.add(
                new FallDeathTrigger({ pos: vec(x, y), ...triggerConfig }),
              );
          }
        default:
          break;
      }
    });
  });

  // Add left boundary ground
  const leftBoundary = new Ground({
    type: "ground",
    x: -64,
    y: 0,
    width: 64,
    height: 1000,
    properties: {
      type: "metal",
    },
  });
  scene.add(leftBoundary);
};

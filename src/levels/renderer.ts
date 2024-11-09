import { Scene, Vector } from "excalibur";
import Player from "../actors/player/player";
import Ground from "../actors/world/ground";
import { Level, PlayerEntity } from "./types";

const createPlayerActor = (entity: PlayerEntity) => {
  // Render player entity
  const player = new Player({
    pos: new Vector(entity.x, entity.y),
  });
  return player;
};

export const initLevel = (level: Level, scene: Scene) => {
  // Add player
  const player = level.player;
  // Add layers
  level.layers.forEach((layer) => {
    layer.forEach((entity) => {
      switch (entity.type) {
        case "ground":
          scene.add(new Ground(entity));
          break;
        default:
          break;
      }
    });
  });

  scene.add(createPlayerActor(player));
};

import { Scene } from "excalibur";
import Player from "../actors/player/player";

export const getPlayer = (scene: Scene) => {
  const player = scene.actors.find((a) => a.name === "player");
  if (player) {
    return player as Player;
  } else {
    throw new Error("Player not found");
  }
};

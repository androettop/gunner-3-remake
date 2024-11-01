import { Actor, vec } from "excalibur";
import { PlayerResources } from "./resources";

export class Player extends Actor {
  constructor() {
    super({
      pos: vec(150, 150),
      width: 100,
      height: 100,
    });
  }

  onInitialize() {
    this.graphics.add(PlayerResources.PlayerSprites.toSprite());
    this.on("pointerup", () => {
      alert("yo");
    });
  }
}

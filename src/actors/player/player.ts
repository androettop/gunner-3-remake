import { Actor, CollisionType, Vector } from "excalibur";
import { playerSpriteSheet } from "./resources";

export interface PlayerParams {
  pos: Vector;
}

class Player extends Actor {
  constructor({ pos }: PlayerParams) {
    super({
      pos: pos,
      width: 64,
      height: 64,
    });
  }

  onInitialize() {
    this.graphics.add(playerSpriteSheet.getSprite(0, 0));
    this.on("pointerup", () => {
      alert("yo");
    });
    this.body.collisionType = CollisionType.Active;
    this.body.useGravity = true;
  }
}

export default Player;

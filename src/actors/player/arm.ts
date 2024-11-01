import { Actor, Animation, CollisionType, Engine, range, vec } from "excalibur";
import { playerArmRunSheet } from "./resources";

export type PlayerArmAnim = "run" | "jump" | "idle";

class PlayerArm extends Actor {
  public animState: PlayerArmAnim = "idle";
  public armDirection: 1 | -1 = 1;

  private baseArmRunAnim = Animation.fromSpriteSheet(
    playerArmRunSheet,
    range(0, 7),
    50,
  );

  constructor() {
    super({
      pos: vec(0, 0),
      width: 64,
      height: 64,
    });
  }

  public update() {
    this.graphics.flipHorizontal = this.armDirection === -1;
    switch (this.animState) {
      case "idle":
        this.graphics.use(playerArmRunSheet.getSprite(0, 0));
        break;
      case "run":
        this.graphics.use(this.baseArmRunAnim);
        break;
      case "idle":
        this.graphics.use(playerArmRunSheet.getSprite(0, 0));
        break;
    }
  }

  public onInitialize(engine: Engine) {
    super.onInitialize(engine);
    this.body.collisionType = CollisionType.PreventCollision;
  }
}

export default PlayerArm;

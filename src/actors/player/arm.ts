import { Actor, Animation, CollisionType, Engine, range, vec } from "excalibur";
import { playerArmRunSheet } from "./resources";
import Player from "./player";

class PlayerArm extends Actor {
  private runAnimation = Animation.fromSpriteSheet(
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

  public animateArm() {
    const player = this.parent as Player | null;
    if (!player) {
      return;
    }
    if (!player.isOnGround) {
      this.graphics.use(playerArmRunSheet.getSprite(0, 0));
    } else if (player.isRunning) {
      this.graphics.use(this.runAnimation);
    } else {
      this.graphics.use(playerArmRunSheet.getSprite(0, 0));
    }
    this.graphics.flipHorizontal = player.direction < 0;
    this.graphics.offset.x = -2 * player.direction;
  }

  public update() {
    this.animateArm();
  }

  public onInitialize(engine: Engine) {
    super.onInitialize(engine);
    this.body.collisionType = CollisionType.PreventCollision;
  }
}

export default PlayerArm;

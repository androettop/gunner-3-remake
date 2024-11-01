import { Actor, Animation, CollisionType, Engine, range, vec } from "excalibur";
import { playerArmRunSheet } from "./resources";
import Player from "./player";

class PlayerArm extends Actor {
  public direction: 1 | -1 = 1;
  public isRunning = false;
  public isOnGround = false;

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

  public updateArmState() {
    const parent = this.parent as Player;
    this.isOnGround = parent.isOnGround;
    this.isRunning = parent.isRunning;
    this.direction = parent.direction;
  }

  public animateArm() {
    if (!this.isOnGround) {
      this.graphics.use(playerArmRunSheet.getSprite(0, 0));
    } else if (this.isRunning) {
      this.graphics.use(this.runAnimation);
    } else {
      this.graphics.use(playerArmRunSheet.getSprite(0, 0));
    }
    this.graphics.flipHorizontal = this.direction < 0;
    this.graphics.offset.x = -2 * this.direction;
  }

  public update() {
    this.updateArmState();
    this.animateArm();
  }

  public onInitialize(engine: Engine) {
    super.onInitialize(engine);
    this.body.collisionType = CollisionType.PreventCollision;
  }
}

export default PlayerArm;

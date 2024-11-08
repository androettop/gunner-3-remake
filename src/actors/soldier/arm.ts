import { Actor, Animation, CollisionType, Engine, range, vec } from "excalibur";
import BaseSoldier from "./base_soldier";

class SoldierArm extends Actor {
  private runAnimation: Animation | null = null;

  constructor() {
    super({
      pos: vec(0, 0),
      width: 64,
      height: 64,
    });
  }

  public animateArm() {
    const soldier = this.parent as BaseSoldier | null;
    if (!soldier || !this.runAnimation) {
      return;
    }
    if (!soldier.isOnGround) {
      this.graphics.use(soldier.spriteSheets.jump.getSprite(1, 0));
    } else if (soldier.isRunning) {
      this.graphics.use(this.runAnimation);
    } else {
      this.graphics.use(soldier.spriteSheets.armRun.getSprite(0, 0));
    }
    this.graphics.flipHorizontal = soldier.direction < 0;
    this.graphics.offset.x = -2 * soldier.direction;
  }

  public update() {
    this.animateArm();
  }

  public onInitialize(engine: Engine) {
    super.onInitialize(engine);

    this.body.collisionType = CollisionType.PreventCollision;

    const soldier = this.parent as BaseSoldier | null;
    if (!soldier) {
      throw new Error("SoldierArm must be a child of BaseSoldier");
    }
    this.runAnimation = Animation.fromSpriteSheet(
      soldier.spriteSheets.armRun,
      range(0, 7),
      50,
    );
  }
}

export default SoldierArm;

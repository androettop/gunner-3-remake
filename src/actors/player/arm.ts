import {
  Actor,
  Animation,
  CollisionType,
  Engine,
  range,
  SpriteSheet,
  vec,
} from "excalibur";
import BaseSoldier from "./base_soldier";

class SoldierArm extends Actor {
  spriteSheet: SpriteSheet | null = null;
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
    if (!soldier || !this.spriteSheet || !this.runAnimation) {
      return;
    }
    if (!soldier.isOnGround) {
      this.graphics.use(this.spriteSheet.getSprite(0, 0));
    } else if (soldier.isRunning) {
      this.graphics.use(this.runAnimation);
    } else {
      this.graphics.use(this.spriteSheet.getSprite(0, 0));
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
    this.spriteSheet = soldier.spriteSheets.armRun;
    this.runAnimation = Animation.fromSpriteSheet(
      this.spriteSheet,
      range(0, 7),
      50,
    );
  }
}

export default SoldierArm;

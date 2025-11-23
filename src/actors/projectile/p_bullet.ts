import {
  Collider,
  CollisionContact,
  CollisionType,
  Engine,
  Side,
} from "excalibur";
import Projectile, { ProjectileParams } from "./projectile";
import { projectile01Sprite } from "./resources";
import BaseEnemy from "../enemies/base_enemy";

abstract class PBullet extends Projectile {
  speed: number = 400;
  damage: number = 1;

  constructor(params: ProjectileParams) {
    super({
      width: 16,
      height: 16,
      ...params,
      collisionType: CollisionType.Passive,
    });
  }

  public destroy(offScreen: boolean = false) {
    if (!offScreen) {
      // Create particle effect
    }
    this.kill();
  }

  public update(engine: Engine, delta: number): void {
    super.update(engine, delta);
  }

  public onInitialize(engine: Engine) {
    super.onInitialize(engine);
    this.graphics.use(projectile01Sprite);
  }

  public onCollisionStart(_self: Collider, other: Collider): void {
    super.onCollisionStart(_self, other);
    if (other.owner instanceof BaseEnemy) {
      this.destroy(false);
    }
  }
}

export default PBullet;

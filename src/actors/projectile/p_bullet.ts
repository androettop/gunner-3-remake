import { CollisionType, Engine } from "excalibur";
import SparkParticle from "../particles/spark";
import Projectile, { ProjectileParams } from "./projectile";
import { projectile01Sprite } from "./resources";

abstract class PBullet extends Projectile {
  speed: number = 400;
  damage: number = 1;
  destroyOnEnemyCollision: boolean = true;
  destroyOnRigidBodyCollision: boolean = true;

  constructor(params: ProjectileParams) {
    super({
      width: 6,
      height: 3,
      ...params,
      collisionType: CollisionType.Passive,
    });
  }

  public destroy(offScreen: boolean = false) {
    if (!offScreen) {
      this.scene?.add(new SparkParticle({ pos: this.pos.clone() }));
    }
    this.kill();
  }

  public onInitialize(engine: Engine) {
    super.onInitialize(engine);
    this.graphics.use(projectile01Sprite);
  }
}

export default PBullet;

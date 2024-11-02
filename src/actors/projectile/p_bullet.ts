import { Engine } from "excalibur";
import Projectile, { ProjectileParams } from "./projectile";
import { projectile01Sprite } from "./resources";

abstract class PBullet extends Projectile {
  speed: number = 400;

  constructor(params: ProjectileParams) {
    super({
      width: 16,
      height: 16,
      ...params,
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
}

export default PBullet;

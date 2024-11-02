import { Actor, ActorArgs, CollisionType, Engine, vec } from "excalibur";

export interface ProjectileParams extends ActorArgs {
  /**
   * The angle in radians to fire the projectile
   */
  directionAngle: number;
}

abstract class Projectile extends Actor {
  abstract speed: number;
  private directionAngle: number;

  constructor({ directionAngle, ...rest }: ProjectileParams) {
    super({
      pos: vec(0, 0),
      ...rest,
    });
    this.directionAngle = directionAngle;
  }

  abstract destroy(offScreen: boolean): void;

  public update(engine: Engine, delta: number): void {
    super.update(engine, delta);
    if (this.isOffScreen) {
      this.destroy(true);
    }
  }

  public onInitialize(engine: Engine) {
    super.onInitialize(engine);
    this.body.collisionType = CollisionType.Passive;
    this.vel = vec(
      this.speed * Math.cos(this.directionAngle),
      this.speed * Math.sin(this.directionAngle),
    );
    this.rotation = this.directionAngle;
  }
}

export default Projectile;

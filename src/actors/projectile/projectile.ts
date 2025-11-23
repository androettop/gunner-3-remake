import {
  Actor,
  ActorArgs,
  Collider,
  CollisionContact,
  CollisionType,
  Engine,
  Side,
  vec,
  Vector,
} from "excalibur";
import BaseEnemy from "../enemies/base_enemy";

export interface ProjectileParams extends ActorArgs {
  /**
   * The angle in radians to fire the projectile
   */
  directionAngle: number;
  /**
   * The base velocity of the projectile
   */
  baseVelocity: Vector;
}

abstract class Projectile extends Actor {
  abstract speed: number;
  private directionAngle: number;
  abstract damage: number;

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

  public onCollisionStart(_self: Collider, other: Collider): void {
    if (other.owner instanceof BaseEnemy) {
      other.owner.health -= this.damage;
      console.log(`Enemy hit! New health: ${other.owner.health}`);
    }
  }
}

export default Projectile;

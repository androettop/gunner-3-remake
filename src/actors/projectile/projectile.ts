import {
  Actor,
  ActorArgs,
  Collider,
  CollisionType,
  Engine,
  vec,
  Vector,
} from "excalibur";
import BaseCreature from "../enemies/base_creature";
import RigidBody from "../world/rigid_body";
import BaseSoldier from "../soldier/base_soldier";
import BloodParticle from "../particles/blood";

export interface ProjectileParams extends ActorArgs {
  /**
   * The angle in radians to fire the projectile
   */
  directionAngle: number;
  /**
   * Solider that fired the projectile
   */
  parentSoldier: BaseSoldier;
  /**
   * The base velocity of the projectile
   */
  baseVelocity: Vector;
}

abstract class Projectile extends Actor {
  abstract speed: number;
  private directionAngle: number;
  protected parentSoldier: BaseSoldier;
  abstract damage: number;
  abstract destroyOnEnemyCollision: boolean;
  abstract destroyOnRigidBodyCollision: boolean;

  constructor({ directionAngle, parentSoldier, ...rest }: ProjectileParams) {
    super({
      pos: vec(0, 0),
      ...rest,
    });
    this.directionAngle = directionAngle;
    this.parentSoldier = parentSoldier;
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
    // avoid collision with parent soldier
    if (other.owner === this.parentSoldier) {
      return;
    }

    if (other.owner instanceof BaseCreature && other.owner.health > 0) {
      other.owner.health -= this.damage;
      if (this.destroyOnEnemyCollision) {
        this.destroy(false);
      }
      if (other.owner.bleeds) {
        const bloodPos = this.pos.clone();
        // randomize a little bit the blood x position (-3 to 3)
        bloodPos.x += Math.random() * 6 - 3;
        this.scene?.add(new BloodParticle({ pos: bloodPos }));
      }
    } else if (
      other.owner instanceof RigidBody &&
      this.destroyOnRigidBodyCollision
    ) {
      this.destroy(false);
    }
  }
}

export default Projectile;

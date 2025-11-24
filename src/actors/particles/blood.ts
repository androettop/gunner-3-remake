import {
  AnimationStrategy,
  Collider,
  CollisionContact,
  CollisionType,
  range,
  Side,
  vec,
  Vector,
} from "excalibur";
import RigidBody from "../world/rigid_body";
import BaseParticle from "./base_particle";
import { bloodSprite } from "./resources";

export default class BloodParticle extends BaseParticle {
  constructor({ pos }: { pos: Vector }) {
    super({
      pos,
      sprite: bloodSprite,
      range: range(0, 5),
      duration: 50,
      autoStart: false,
      autoDestroy: false,
      gravity: true,
      animStrategy: AnimationStrategy.Freeze,
      collisionType: CollisionType.Passive,
      width: 12,
      height: 15,
    });
  }

  public onCollisionStart(
    self: Collider,
    other: Collider,
    side: Side,
    contact: CollisionContact,
  ): void {
    super.onCollisionStart(self, other, side, contact);
    // if collides with rigid body from bottom, play animation
    if (other.owner instanceof RigidBody && side === Side.Bottom) {
      this.animation.play();
      this.acc = vec(0, 0); // stop falling
      this.vel = vec(0, 0); // stop moving
    }
  }
}

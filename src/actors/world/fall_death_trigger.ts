import {
  Collider,
  CollisionContact,
  CollisionType,
  Side,
  Vector,
} from "excalibur";
import BaseCreature from "../enemies/base_creature";
import RigidBody from "./rigid_body";

export interface FallDeathTriggerParams {
  pos: Vector;
}

export default class FallDeathTrigger extends RigidBody {
  constructor({ pos, ...rest }: FallDeathTriggerParams) {
    super({
      pos,
      anchor: Vector.Zero,
      collisionType: CollisionType.Passive,
      ...rest,
    });
  }

  onCollisionStart(
    self: Collider,
    other: Collider,
    side: Side,
    contact: CollisionContact,
  ): void {
    if (other.owner instanceof BaseCreature) {
      // Instantly kill the creature that collides with the fall death trigger
      other.owner.health = 0;
    }

    super.onCollisionStart(self, other, side, contact);
  }
}

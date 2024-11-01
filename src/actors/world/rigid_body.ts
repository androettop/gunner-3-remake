import { ActorArgs, CollisionType, Graphic, Vector } from "excalibur";
import StaticImage from "../ui/static_image";

export interface RigidBodyParams extends ActorArgs {
  pos: Vector;
  sprite: Graphic;
}

class RigidBody extends StaticImage {
  constructor({ pos, sprite, ...rest }: RigidBodyParams) {
    super({ pos, sprite, ...rest });
  }

  onInitialize() {
    super.onInitialize();
    this.body.useGravity = false;
    this.body.collisionType = CollisionType.Fixed;
  }
}

export default RigidBody;

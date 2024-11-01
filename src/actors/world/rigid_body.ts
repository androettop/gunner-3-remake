import { CollisionType, Graphic, Vector } from "excalibur";
import StaticImage from "../ui/static_image";

export interface RigidBodyParams {
  pos: Vector;
  sprite: Graphic;
}

class RigidBody extends StaticImage {
  constructor({ pos, sprite }: RigidBodyParams) {
    super({ pos, sprite });
  }

  onInitialize() {
    super.onInitialize();
    this.body.useGravity = false;
    this.body.collisionType = CollisionType.Fixed;
  }
}

export default RigidBody;

import { Actor, ActorArgs, CollisionType, Graphic, Vector } from "excalibur";

export interface RigidBodyParams extends ActorArgs {
  pos: Vector;
  width?: number;
  height?: number;
  sprite?: Graphic;
}

class RigidBody extends Actor {
  constructor({ pos, sprite, width, height, ...rest }: RigidBodyParams) {
    const _width = width || sprite?.width;
    const _height = height || sprite?.height;
    super({ pos, width: _width, height: _height, ...rest });
    if (sprite) {
      this.graphics.use(sprite);
    }
  }

  onInitialize() {
    this.body.useGravity = false;
    this.body.collisionType = CollisionType.Fixed;
  }
}

export default RigidBody;

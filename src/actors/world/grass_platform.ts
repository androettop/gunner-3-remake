import { ActorArgs, Vector } from "excalibur";
import RigidBody from "./rigid_body";
import { worldSpriteSheet } from "./resources";
import { GroundCollisionGroup } from "../../helpers/consts";

export interface GrassPlatformParams extends ActorArgs {
  pos: Vector;
}

class GrassPlatform extends RigidBody {
  constructor({ pos, rest }: GrassPlatformParams) {
    super({
      pos,
      sprite: worldSpriteSheet.sprites[2],
      collisionGroup: GroundCollisionGroup,
      ...rest,
    });
    this.body.gro;
  }
}

export default GrassPlatform;

import { ActorArgs, Vector } from "excalibur";
import RigidBody from "./rigid_body";
import { worldSpriteSheet } from "./resources";

export interface GrassPlatformParams extends ActorArgs {
  pos: Vector;
}

class GrassPlatform extends RigidBody {
  constructor({ pos, ...rest }: GrassPlatformParams) {
    super({
      pos,
      sprite: worldSpriteSheet.sprites[2],
      anchor: Vector.Zero,
      ...rest,
    });
  }
}

export default GrassPlatform;

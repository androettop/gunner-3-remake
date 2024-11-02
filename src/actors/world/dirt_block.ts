import { ActorArgs, Vector } from "excalibur";
import RigidBody from "./rigid_body";
import { worldSpriteSheet } from "./resources";

export interface DirtBlockParams extends ActorArgs {
  pos: Vector;
}

class DirtBlock extends RigidBody {
  constructor({ pos, ...rest }: DirtBlockParams) {
    super({
      pos,
      sprite: worldSpriteSheet.sprites[0],
      anchor: Vector.Zero,
      ...rest,
    });
  }
}

export default DirtBlock;

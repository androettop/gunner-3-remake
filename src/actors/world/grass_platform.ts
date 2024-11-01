import { Vector } from "excalibur";
import RigidBody from "./rigid_body";
import { worldSpriteSheet } from "./resources";

export interface GrassPlatformParams {
  pos: Vector;
}

class GrassPlatform extends RigidBody {
  constructor({ pos }: GrassPlatformParams) {
    super({ pos, sprite: worldSpriteSheet.sprites[2] });
  }
}

export default GrassPlatform;

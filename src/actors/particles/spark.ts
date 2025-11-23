import { range, Vector } from "excalibur";
import BaseParticle from "./base_particle";
import { sparkSprite } from "./resources";

export default class SparkParticle extends BaseParticle {
  constructor({ pos }: { pos: Vector }) {
    super({
      pos,
      sprite: sparkSprite,
      range: range(0, 4),
      duration: 50,
    });
  }
}

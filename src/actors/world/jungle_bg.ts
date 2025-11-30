import { Actor, ActorArgs, Engine, TileMap, vec, Vector } from "excalibur";
import { backgroundSpriteSheet } from "./resources";
import StaticImage from "../ui/static_image";

export interface JungleBackgroundConfig extends ActorArgs {
  width: number;
  height: number;
  pos: Vector;
}

export default class JungleBackground extends Actor {
  constructor(config: JungleBackgroundConfig) {
    super({
      pos: config.pos,
      anchor: Vector.Zero,
      width: config.width,
      height: config.height,
    });
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);

    const sky = new StaticImage({
      pos: vec(0, 0),
      sprite: backgroundSpriteSheet.getSprite(0, 0),
    });
    sky.scale.x = 100;
    this.addChild(sky);

    const sprite = backgroundSpriteSheet.getSprite(2, 0);

    // jungle vegetation tilemap
    const vegetationTilemap = new TileMap({
      rows: 1,
      columns: Math.ceil(this.width / sprite.width),
      tileWidth: sprite.width,
      tileHeight: sprite.height,
    });

    // loop through tilemap cells
    for (let tile of vegetationTilemap.tiles) {
      tile.addGraphic(sprite, { offset: vec(0, 100) });
    }

    this.addChild(vegetationTilemap);
  }
}

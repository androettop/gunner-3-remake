import { Actor, ActorArgs, Engine, TileMap, Vector } from "excalibur";
import { backgroundSpriteSheet } from "./resources";

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

    const sprite = backgroundSpriteSheet.getSprite(2, 0);

    const baseTilemap = new TileMap({
      rows: Math.ceil(this.height / sprite.height),
      columns: Math.ceil(this.width / sprite.width),
      tileWidth: sprite.width,
      tileHeight: sprite.height,
    });

    // loop through tilemap cells
    for (let tile of baseTilemap.tiles) {
      tile.addGraphic(sprite);
    }

    try {
      this.addChild(baseTilemap);
    } catch (error) {
      console.error("Error adding jungle background tilemap:", error);
    }
  }
}

import {
  Actor,
  ActorArgs,
  CollisionType,
  Engine,
  TileMap,
  vec,
  Vector,
} from "excalibur";
import { GroundEntity } from "../../levels/types";
import { worldSpriteSheet } from "./resources";

export interface DirtBlockParams extends ActorArgs {
  pos: Vector;
}

class Ground extends Actor {
  private _entity: GroundEntity;

  constructor(entity: GroundEntity) {
    const tileWidth = 64;
    const tileHeight = 64;

    const fixedWidth = Math.ceil(entity.width / tileWidth) * tileWidth;
    const fixedHeight = Math.ceil(entity.height / tileHeight) * tileHeight;

    if (entity.width !== fixedWidth) {
      console.warn(`Ground width should be a multiple of ${tileWidth}`);
    }

    if (entity.height !== fixedHeight) {
      console.warn(`Ground height should be a multiple of ${tileHeight}`);
    }

    super({
      pos: vec(entity.x, entity.y),
      anchor: Vector.Zero,
      collisionType: CollisionType.Fixed,
      width: fixedWidth,
      height: fixedHeight,
    });

    this._entity = entity;
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);

    let baseTileSprite;
    if (this._entity.properties.type.endsWith("-grass")) {
      // dirt
      baseTileSprite = worldSpriteSheet.sprites[0];
    } else {
      // metal
      baseTileSprite = worldSpriteSheet.sprites[5];
    }

    let platformTileSprite;
    switch (this._entity.properties.type) {
      case "green-grass":
        platformTileSprite = worldSpriteSheet.sprites[2];
        break;
      case "red-grass":
        platformTileSprite = worldSpriteSheet.sprites[3];
        break;
      case "blue-grass":
        platformTileSprite = worldSpriteSheet.sprites[4];
        break;
      default:
        break;
    }

    const baseTilemap = new TileMap({
      rows: Math.ceil(this.height / 64),
      columns: Math.ceil(this.width / 64),
      tileWidth: 64,
      tileHeight: 64,
    });

    // loop through tilemap cells
    for (let tile of baseTilemap.tiles) {
      tile.addGraphic(baseTileSprite);
    }

    this.addChild(baseTilemap);

    if (platformTileSprite) {
      const platformTilemap = new TileMap({
        rows: 1,
        columns: Math.ceil(this.width / 64),
        tileWidth: 64,
        tileHeight: 20,
      });

      // loop through tilemap cells
      for (let tile of platformTilemap.tiles) {
        tile.addGraphic(platformTileSprite);
      }

      this.addChild(platformTilemap);
    }
  }
}

export default Ground;

import { SpriteSheet } from "excalibur";
import { PlayerResources } from "../player/resources";

export const weapon01SpriteSheet = SpriteSheet.fromImageSource({
  image: PlayerResources.PlayerSprites,
  grid: {
    rows: 2,
    columns: 8,
    spriteWidth: 64,
    spriteHeight: 64,
  },
  spacing: {
    originOffset: {
      y: 128,
    },
  },
});

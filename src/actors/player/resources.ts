import { ImageSource, SpriteSheet } from "excalibur";
import playerSprites from "../../assets/images/player/player.png";

export const PlayerResources = {
  PlayerSprites: new ImageSource(playerSprites),
} as const;

export const playerSpriteSheet = SpriteSheet.fromImageSource({
  image: PlayerResources.PlayerSprites,
  grid: {
    rows: 8,
    columns: 8,
    spriteWidth: 64,
    spriteHeight: 64,
  },
});

import { ImageSource, SpriteSheet } from "excalibur";
import playerSprites from "../../assets/images/player/player.png";

export const PlayerResources = {
  PlayerSprites: new ImageSource(playerSprites),
} as const;

export const playerRunSheet = SpriteSheet.fromImageSource({
  image: PlayerResources.PlayerSprites,
  grid: {
    rows: 1,
    columns: 8,
    spriteWidth: 64,
    spriteHeight: 64,
  },
});

export const playerArmRunSheet = SpriteSheet.fromImageSource({
  image: PlayerResources.PlayerSprites,
  grid: {
    rows: 1,
    columns: 8,
    spriteWidth: 64,
    spriteHeight: 64,
  },
  spacing: {
    originOffset: {
      y: 64,
    },
  },
});

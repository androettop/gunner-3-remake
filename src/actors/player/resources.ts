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

export const playerDeathSheet = SpriteSheet.fromImageSource({
  image: PlayerResources.PlayerSprites,
  grid: {
    rows: 1,
    columns: 8,
    spriteWidth: 64,
    spriteHeight: 64,
  },
  spacing: {
    originOffset: {
      y: 64 * 8,
      x: 0,
    },
  },
});

export const playerJumpSheet = SpriteSheet.fromImageSourceWithSourceViews({
  image: PlayerResources.PlayerSprites,
  sourceViews: [
    // jump body
    { x: 0, y: 64 * 7, width: 64, height: 64 },
    // jump arm
    { x: 64 * 2, y: 64 * 7, width: 64, height: 64 },
  ],
});

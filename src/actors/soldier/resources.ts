import { ImageSource, SpriteSheet } from "excalibur";
import playerSprites from "../../assets/images/player/player.png";
import { greenToRed } from "../../helpers/colors";

const basePlayerSprite = new ImageSource(playerSprites);

export const SoldierResources = {
  PlayerSprites: basePlayerSprite,
  EnemySprites: await greenToRed(playerSprites),
} as const;

export const getSoldierSpriteSheets = (
  image: ImageSource,
): Record<string, SpriteSheet> => ({
  run: SpriteSheet.fromImageSource({
    image: image,
    grid: {
      rows: 1,
      columns: 8,
      spriteWidth: 64,
      spriteHeight: 64,
    },
  }),
  armRun: SpriteSheet.fromImageSource({
    image: image,
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
  }),
  death: SpriteSheet.fromImageSource({
    image: image,
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
  }),
  jump: SpriteSheet.fromImageSourceWithSourceViews({
    image: image,
    sourceViews: [
      // jump body
      { x: 0, y: 64 * 7, width: 64, height: 64 },
      // jump arm
      { x: 64 * 2, y: 64 * 7, width: 64, height: 64 },
    ],
  }),
  weapon01: SpriteSheet.fromImageSource({
    image: image,
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
  }),
  weapon02: SpriteSheet.fromImageSource({
    image: image,
    grid: {
      rows: 2,
      columns: 8,
      spriteWidth: 64,
      spriteHeight: 64,
    },
    spacing: {
      originOffset: {
        y: 256,
      },
    },
  }),
});

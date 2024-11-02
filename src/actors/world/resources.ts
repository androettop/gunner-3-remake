import { ImageSource, SpriteSheet } from "excalibur";
import worldSprites from "../../assets/images/world/world.png";

export const WorldResources = {
  WorldSprites: new ImageSource(worldSprites),
} as const;

export const worldSpriteSheet = SpriteSheet.fromImageSourceWithSourceViews({
  image: WorldResources.WorldSprites,
  sourceViews: [
    // front dirt
    { x: 0, y: 0, width: 64, height: 64 },
    // back dirt
    { x: 64, y: 0, width: 64, height: 64 },
    // green grass platform
    { x: 128, y: 0, width: 64, height: 20 },
    // red grass platform
    { x: 128, y: 22, width: 64, height: 20 },
    // blue grass platform
    { x: 128, y: 44, width: 64, height: 20 },
    // front metal
    { x: 192, y: 0, width: 64, height: 64 },
    // back metal
    { x: 256, y: 0, width: 64, height: 64 },
    // metal platform
    { x: 320, y: 0, width: 64, height: 20 },
  ],
});

export const backgroundSpriteSheet = SpriteSheet.fromImageSourceWithSourceViews(
  {
    image: WorldResources.WorldSprites,
    sourceViews: [
      // blue sky
      { x: 640, y: 64, width: 64, height: 192 },
      // red sky
      { x: 704, y: 64, width: 64, height: 448 },
    ],
  },
);

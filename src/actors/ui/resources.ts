import { ImageSource, SpriteSheet } from "excalibur";
import uiSprites from "../../assets/images/hub/ui.png";

export const UiResources = {
  UiSprites: new ImageSource(uiSprites),
} as const;

export const mainMenuSpriteSheet = SpriteSheet.fromImageSourceWithSourceViews({
  image: UiResources.UiSprites,
  sourceViews: [
    // start button
    { x: 0, y: 138, width: 100, height: 32 },
    // start button pressed
    { x: 100, y: 138, width: 100, height: 32 },
    // load button
    { x: 0, y: 138 + 32, width: 100, height: 32 },
    // load button pressed
    { x: 100, y: 138 + 32, width: 100, height: 32 },
    // exit button
    { x: 0, y: 138 + 32 * 2, width: 100, height: 32 },
    // exit button pressed
    { x: 100, y: 138 + 32 * 2, width: 100, height: 32 },
    // gunner3 logo
    { x: 0, y: 245, width: 366, height: 251 },
    // gunner3 character
    { x: 366, y: 245, width: 175, height: 284 },
    // knpmaster label
    { x: 200, y: 144, width: 167, height: 14 },
    // androettop label
    { x: 200 + 167, y: 144, width: 137, height: 14 },
    // tribute label
    { x: 200, y: 158, width: 332, height: 14 },
  ],
});

export const healthIndicatorSpriteSheet = SpriteSheet.fromImageSource({
  image: UiResources.UiSprites,
  grid: {
    rows: 1,
    columns: 11,
    spriteWidth: 32,
    spriteHeight: 86,
  },
  spacing: {
    originOffset: {
      x: 220,
      y: 58,
    },
  },
});

import { ImageSource, SpriteSheet } from "excalibur";
import uiSprites from "../../assets/images/hub/ui.png";

export const UiResources = {
  UiSprites: new ImageSource(uiSprites),
} as const;

export const uiSpriteSheet = SpriteSheet.fromImageSourceWithSourceViews({
  image: UiResources.UiSprites,
  sourceViews: [
    // start button
    { x: 0, y: 138, width: 100, height: 32 },
    // start button pressed
    { x: 0, y: 138, width: 100, height: 32 },
    // load button
    { x: 0, y: 138 + 32, width: 100, height: 32 },
    // load button pressed
    { x: 0, y: 138 + 32, width: 100, height: 32 },
    // exit button
    { x: 0, y: 138 + 32 * 2, width: 100, height: 32 },
    // exit button pressed
    { x: 0, y: 138 + 32 * 2, width: 100, height: 32 },
  ],
});

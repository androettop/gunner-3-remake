import { ImageSource, SpriteFont, SpriteSheet } from "excalibur";
import spriteFont1DarkImage from "../../assets/images/fonts/font1.png";
import spriteFont1LightImage from "../../assets/images/fonts/font1-light.png";
import spriteFont2DarkImage from "../../assets/images/fonts/font2.png";
import spriteFont2DLightImage from "../../assets/images/fonts/font2-light.png";

export const TextResources = {
  Font1: new ImageSource(spriteFont1DarkImage),
  Font1Light: new ImageSource(spriteFont1LightImage),
  Font2: new ImageSource(spriteFont2DarkImage),
  Font2Light: new ImageSource(spriteFont2DLightImage),
} as const;

const grid8x12 = {
  rows: 1,
  columns: 64,
  spriteWidth: 8,
  spriteHeight: 12,
};

const grid12x16 = {
  rows: 1,
  columns: 64,
  spriteWidth: 12,
  spriteHeight: 16,
};

const alphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz1234567890.";

export const spriteFont1Sheet = SpriteSheet.fromImageSource({
  image: TextResources.Font1,
  grid: grid8x12,
});

export const spriteFont2Sheet = SpriteSheet.fromImageSource({
  image: TextResources.Font2,
  grid: grid12x16,
});

export const spriteFont1LightSheet = SpriteSheet.fromImageSource({
  image: TextResources.Font1Light,
  grid: grid8x12,
});

export const spriteFont2LightSheet = SpriteSheet.fromImageSource({
  image: TextResources.Font2Light,
  grid: grid12x16,
});

export const spriteFont1 = new SpriteFont({
  alphabet,
  spriteSheet: spriteFont1Sheet,
});

export const spriteFont2 = new SpriteFont({
  alphabet,
  spriteSheet: spriteFont2Sheet,
});

export const spriteFont1Light = new SpriteFont({
  alphabet,
  spriteSheet: spriteFont1LightSheet,
});

export const spriteFont2Light = new SpriteFont({
  alphabet,
  spriteSheet: spriteFont2LightSheet,
});

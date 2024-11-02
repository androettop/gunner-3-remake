import { ImageSource, SpriteFont, SpriteSheet } from "excalibur";
import spriteFont1Image from "../../assets/images/fonts/font1.png";

export const TextResources = {
  Font1: new ImageSource(spriteFont1Image),
} as const;

export const spriteFont1Sheet = SpriteSheet.fromImageSource({
  image: TextResources.Font1,
  grid: {
    rows: 1,
    columns: 64,
    spriteWidth: 6,
    spriteHeight: 13,
  },
});

export const spriteFont1 = new SpriteFont({
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890. ",
  caseInsensitive: false,
  spriteSheet: spriteFont1Sheet,
});

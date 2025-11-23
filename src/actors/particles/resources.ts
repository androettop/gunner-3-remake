import { ImageSource, SpriteSheet } from "excalibur";
import sparkImage from "../../assets/images/particles/spark.png";

export const ParticlesResources = {
  sparkSprite: new ImageSource(sparkImage),
} as const;

export const sparkSprite = SpriteSheet.fromImageSource({
  image: ParticlesResources.sparkSprite,
  grid: {
    rows: 1,
    columns: 4,
    spriteWidth: 10,
    spriteHeight: 10,
  },
});

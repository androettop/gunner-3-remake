import { ImageSource, SpriteSheet } from "excalibur";
import sparkImage from "../../assets/images/particles/spark.png";
import bloodImage from "../../assets/images/particles/blood.png";

export const ParticlesResources = {
  sparkSprite: new ImageSource(sparkImage),
  bloodSprite: new ImageSource(bloodImage),
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

export const bloodSprite = SpriteSheet.fromImageSource({
  image: ParticlesResources.bloodSprite,
  grid: {
    rows: 1,
    columns: 5,
    spriteWidth: 32,
    spriteHeight: 15,
  },
});

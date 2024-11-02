import { ImageSource } from "excalibur";
import bulletSprite from "../../assets/images/weapons/bullet_01.png";

export const ProjectileResources = {
  Projectile01Sprite: new ImageSource(bulletSprite),
} as const;

export const projectile01Sprite =
  ProjectileResources.Projectile01Sprite.toSprite();

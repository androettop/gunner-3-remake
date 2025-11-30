import { Engine, SpriteSheet, vec } from "excalibur";
import PBullet from "../projectile/p_bullet";
import BaseSoldier from "../soldier/base_soldier";
import { SoundResources } from "../sounds/resources";
import Weapon from "./weapon";

class WpShotgun extends Weapon {
  public readonly twoHanded = true;
  public readonly label = "Shot Gun";
  public readonly projectileType = PBullet;
  public readonly weaponSize = vec(20, 6);
  public readonly shootThrottle = 100;
  public readonly shootSound = SoundResources.Weapon01Sound;
  private spriteSheet: SpriteSheet | null = null;

  public animateWeapon() {
    const soldier = this.parent as BaseSoldier | null;
    if (!soldier || !this.spriteSheet) {
      return;
    }
    this.graphics.use(this.spriteSheet.getSprite(0, 0));
    this.graphics.flipHorizontal = soldier.direction < 0;
    this.graphics.offset.x = -2 * soldier.direction;
  }

  public update(engine: Engine, delta: number): void {
    super.update(engine, delta);
    this.animateWeapon();
  }

  public onInitialize(engine: Engine) {
    super.onInitialize(engine);

    const soldier = this.parent as BaseSoldier | null;
    if (!soldier) {
      throw new Error("Weapons must be a child of BaseSoldier");
    }
    this.spriteSheet = soldier.spriteSheets.weapon02;
  }
}

export default WpShotgun;

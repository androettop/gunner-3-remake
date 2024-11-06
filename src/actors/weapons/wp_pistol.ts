import Weapon from "./weapon";
import Player from "../player/player";
import PBullet from "../projectile/p_bullet";
import { Engine, SpriteSheet, vec } from "excalibur";
import { SoundResources } from "../sounds/resources";
import BaseSoldier from "../player/base_soldier";

class WpPistol extends Weapon {
  public readonly twoHanded = false;
  public readonly label = "Pistol";
  public readonly projectileType = PBullet;
  public readonly weaponSize = vec(21, 0);
  public readonly shootThrottle = 800;
  public readonly shootSound = SoundResources.Weapon01Sound;
  private spriteSheet: SpriteSheet | null = null;

  public animateWeapon() {
    const player = this.parent as Player | null;
    if (!player || !this.spriteSheet) {
      return;
    }
    this.graphics.use(this.spriteSheet.getSprite(0, 0));
    this.graphics.flipHorizontal = player.direction < 0;
    this.graphics.offset.x = -2 * player.direction;
  }

  public update() {
    this.animateWeapon();
  }

  public onInitialize(engine: Engine) {
    super.onInitialize(engine);

    const soldier = this.parent as BaseSoldier | null;
    if (!soldier) {
      throw new Error("Weapons must be a child of BaseSoldier");
    }
    this.spriteSheet = soldier.spriteSheets.weapon01;
  }
}

export default WpPistol;

import Weapon from "./weapon";
import Player from "../player/player";
import { weapon01SpriteSheet } from "./resources";
import PBullet from "../projectile/p_bullet";
import { vec } from "excalibur";
import { SoundResources } from "../sounds/resources";

class WpPistol extends Weapon {
  public readonly twoHanded = false;
  public readonly label = "Pistol";
  public readonly projectileType = PBullet;
  public readonly weaponSize = vec(21, 0);
  public readonly shootThrottle = 800;
  public readonly shootSound = SoundResources.Weapon01Sound;

  public animateWeapon() {
    const player = this.parent as Player | null;
    if (!player) {
      return;
    }
    this.graphics.use(weapon01SpriteSheet.getSprite(0, 0));
    this.graphics.flipHorizontal = player.direction < 0;
    this.graphics.offset.x = -2 * player.direction;
  }

  public update() {
    this.animateWeapon();
  }
}

export default WpPistol;

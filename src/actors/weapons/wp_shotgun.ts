import Weapon from "./weapon";
import Player from "../player/player";
import { weapon02SpriteSheet } from "./resources";
import PBullet from "../projectile/p_bullet";
import { vec } from "excalibur";

class WpShotgun extends Weapon {
  public readonly twoHanded = true;
  public readonly label = "Shot Gun";
  public readonly projectileType = PBullet;
  public readonly weaponSize = vec(20, 6);
  public readonly shootThrottle = 100;

  public animateWeapon() {
    const player = this.parent as Player | null;
    if (!player) {
      return;
    }
    this.graphics.use(weapon02SpriteSheet.getSprite(0, 0));
    this.graphics.flipHorizontal = player.direction < 0;
    this.graphics.offset.x = -2 * player.direction;
  }

  public update() {
    this.animateWeapon();
  }
}

export default WpShotgun;

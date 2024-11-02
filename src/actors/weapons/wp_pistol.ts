import Weapon from "./weapon";
import Player from "../player/player";
import { weapon01SpriteSheet } from "./resources";

class WpPistol extends Weapon {
  public readonly twoHanded = false;
  public readonly label = "Pistol";

  shoot() {
    console.log("shoot");
  }

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

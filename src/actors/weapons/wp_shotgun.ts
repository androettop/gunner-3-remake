import Weapon from "./weapon";
import Player from "../player/player";
import { weapon02SpriteSheet } from "./resources";

class WpShotgun extends Weapon {
  public readonly twoHanded = true;
  public readonly label = "Shot Gun";

  shoot() {
    console.log("shoot");
  }

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

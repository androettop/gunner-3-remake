import { Actor, ImageSource, vec } from "excalibur";
import { getPlayer } from "../../helpers/player";
import { weaponsIndicatorSpriteSheet } from "./resources";
import Player from "../player/player";
import { WEAPONS_COUNT } from "../../helpers/consts";
import StaticImage from "./static_image";

class WeaponsIndicator extends Actor {
  player?: Player;

  constructor() {
    super({
      pos: vec(40, 4),
      anchor: vec(0, 0),
    });
  }

  lastEnabledWeaponsLength = 0;
  lastActiveWeapon: number | null = null;

  private updateWeaponSprite(weapon: number, active: boolean) {
    const weaponIndicator = this.children[weapon] as StaticImage;
    // 20 weapons per row
    let column = weapon % 20;
    let row = Math.floor(weapon / 20);
    weaponIndicator.sprite = weaponsIndicatorSpriteSheet.getSprite(
      column,
      row + (active ? 2 : 0),
    );
  }

  public update() {
    if (!this.player && this.scene) {
      this.player = getPlayer(this.scene);
    }
    if (this.player) {
      // show enabled weapons
      if (this.lastEnabledWeaponsLength !== this.player.enabledWeapons.length) {
        this.lastEnabledWeaponsLength = this.player.enabledWeapons.length;
        // you cannot drop weapons, only enable them
        this.player.enabledWeapons.forEach((weapon) =>
          this.updateWeaponSprite(weapon, false),
        );
      }

      // show active weapon
      if (this.lastActiveWeapon !== this.player.activeWeapon) {
        // mark last active weapon as inactive
        if (this.lastActiveWeapon !== null) {
          this.updateWeaponSprite(this.lastActiveWeapon, false);
        }
        this.updateWeaponSprite(this.player.activeWeapon, true);
        // update last active weapon
        this.lastActiveWeapon = this.player.activeWeapon;
      }
    }
  }

  public onInitialize() {
    for (let i = 0; i < WEAPONS_COUNT; i++) {
      // 20 weapons per row
      let column = i % 20;
      let row = Math.floor(i / 20);
      const weaponIndicator = new StaticImage({
        pos: vec(column * 22, row * 22),
        sprite: new ImageSource(
          "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
        ).toSprite(),
      });
      this.addChild(weaponIndicator);
    }
  }
}

export default WeaponsIndicator;

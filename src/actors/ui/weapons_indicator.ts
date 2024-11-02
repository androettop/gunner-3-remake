import { Actor, Text, vec } from "excalibur";
import { getPlayer } from "../../helpers/player";
import { UiResources, weaponsIndicatorSpriteSheet } from "./resources";
import Player from "../player/player";
import { WEAPONS_COUNT } from "../../helpers/consts";
import StaticImage from "./static_image";
import { spriteFont1 } from "../text/resources";

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
    const weaponIndicator = this.children[weapon + 1] as StaticImage;
    // 20 weapons per row
    let column = weapon % 20;
    let row = Math.floor(weapon / 20);
    weaponIndicator.sprite = weaponsIndicatorSpriteSheet.getSprite(
      column,
      row + (active ? 2 : 0),
    );

    // update text
    if (active && this.player) {
      const textActor = this.children[0] as StaticImage;
      const text = new Text({
        text: `${weapon + 1}.${this.player.weapons[weapon].label}`,
        font: spriteFont1,
      });
      textActor.sprite = text;
    }
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
    // add weapon text
    const text = new Text({
      text: "Hola as7861287368&)&",
      font: spriteFont1,
    });

    const textIndicator = new StaticImage({
      pos: vec(0, 0),
      sprite: text,
    });

    this.addChild(textIndicator);

    // add all weapon indicators
    for (let i = 0; i < WEAPONS_COUNT; i++) {
      // 20 weapons per row
      let column = i % 20;
      let row = Math.floor(i / 20);
      const weaponIndicator = new StaticImage({
        pos: vec(column * 22, 12 + row * 22),
        sprite: UiResources.BlankImage.toSprite(),
      });
      this.addChild(weaponIndicator);
    }
  }
}

export default WeaponsIndicator;

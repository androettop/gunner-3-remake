import { Engine, vec } from "excalibur";
import { GAME_CONTROLS } from "../../helpers/consts";
import { PlayerEntity } from "../../levels/types";
import BaseSoldier from "../soldier/base_soldier";
import { SoldierResources } from "../soldier/resources";

class Player extends BaseSoldier {
  constructor(entity: PlayerEntity) {
    super({
      pos: vec(entity.x, entity.y),
      name: "player",
      spriteImageSource: SoldierResources.PlayerSprites,
    });
    this.health = entity.properties.health;
  }

  public soldierInput(engine: Engine) {
    // wasd movement with keys
    if (
      GAME_CONTROLS.MOVE_RIGHT.some((key) => engine.input.keyboard.isHeld(key))
    ) {
      this.direction = 1;
      this.isRunning = true;
    } else if (
      GAME_CONTROLS.MOVE_LEFT.some((key) => engine.input.keyboard.isHeld(key))
    ) {
      this.direction = -1;
      this.isRunning = true;
    } else {
      this.isRunning = false;
    }

    // aim up and down
    if (GAME_CONTROLS.AIM_UP.some((key) => engine.input.keyboard.isHeld(key))) {
      this.aimDirection = -1;
    } else if (
      GAME_CONTROLS.AIM_DOWN.some((key) => engine.input.keyboard.isHeld(key))
    ) {
      this.aimDirection = 1;
    } else {
      this.aimDirection = 0;
    }

    // jump
    this.wantsJump = GAME_CONTROLS.JUMP.some((key) =>
      engine.input.keyboard.isHeld(key),
    );

    // weapon switching
    GAME_CONTROLS.WEAPON_SWITCH.forEach((keys, index) => {
      if (keys.some((key) => engine.input.keyboard.wasPressed(key))) {
        this.activeWeaponIndex = index;
      }
    });

    // weapon shooting
    if (GAME_CONTROLS.SHOOT.some((key) => engine.input.keyboard.isHeld(key))) {
      this.activeWeapon?.shoot();
    }
  }

  public onDie(engine: Engine) {
    this.actions.delay(3000).callMethod(() => {
      engine.goToScene("main_menu");
    });
  }

  public onInitialize(engine: Engine) {
    super.onInitialize(engine);
    // TODO: remove this
    (window as any).player = this;
  }
}

export default Player;

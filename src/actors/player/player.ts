import {
  Actor,
  Animation,
  AnimationStrategy,
  CollisionType,
  Engine,
  range,
  vec,
  Vector,
} from "excalibur";
import { playerDeathSheet, playerJumpSheet, playerRunSheet } from "./resources";
import PlayerArm from "./arm";
import { CoyoteComponent } from "../../components/input/coyote";
import { GAME_CONTROLS } from "../../helpers/consts";
import Weapon from "../weapons/weapon";
import WpPistol from "../weapons/wp_pistol";
import WpShotgun from "../weapons/wp_shotgun";
import { SoundResources } from "../sounds/resources";

export interface PlayerParams {
  pos: Vector;
}

class Player extends Actor {
  public jumpSpeed = 515;
  public runSpeed = 160;

  public wantsJump = false;
  private isDiyng = false;

  public direction: 1 | -1 = 1;
  public aimDirection: 0 | 1 | -1 = 0;
  public isRunning = false;
  public isOnGround = false;

  private _health = 10; // form 10 to 0

  public weapons: Weapon[] = [new WpPistol(), new WpShotgun()];

  public enabledWeapons: number[] = [0, 1]; // 0 is always enabled

  private _activeWeaponIndex = 0;

  private _activeWeapon: Weapon | null = null;

  public get activeWeapon() {
    return this._activeWeaponIndex;
  }

  public set activeWeapon(value: number) {
    if (
      (this.enabledWeapons.includes(value) || value === 0) &&
      this.weapons[value]
    ) {
      this._activeWeaponIndex = value;
      this.activateWeapon();
    } else {
      console.warn(`Weapon ${value + 1} is not enabled`);
    }
  }

  public get health() {
    return this._health;
  }

  public set health(value: number) {
    this._health = value > 10 ? 10 : value < 0 ? 0 : value;
  }

  public get isDead() {
    return this._health === 0;
  }

  private deathAnimation = Animation.fromSpriteSheet(
    playerDeathSheet,
    range(0, 7),
    50,
    AnimationStrategy.Freeze,
  );

  private runAnimation = Animation.fromSpriteSheet(
    playerRunSheet,
    range(0, 7),
    50,
  );

  private playerArm = new PlayerArm();

  coyote = new CoyoteComponent({
    // allow the player to jump for a short time after walking off a ledge
    jump: {
      time: 70,
      condition: () => this.isOnGround,
    },
  });

  constructor({ pos }: PlayerParams) {
    super({
      pos: pos,
      width: 64,
      height: 64,
      name: "player",
    });
    this.addComponent(this.coyote);
  }

  private playerInput(engine: Engine) {
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
        this.activeWeapon = index;
      }
    });

    // weapon shooting
    if (GAME_CONTROLS.SHOOT.some((key) => engine.input.keyboard.isHeld(key))) {
      this._activeWeapon?.shoot();
    }
  }

  private updateGroundedState() {
    // All the game surfaces are flat, so we can just check if the player is moving vertically
    if (this.vel.y !== 0) {
      this.isOnGround = false;
    }
    if (this.vel.y === 0 && this.oldVel.y === 0) {
      // here we check oldVel to make sure we are not just starting to fall
      this.isOnGround = true;
    }
  }

  private updatePlayerState(engine: Engine) {
    this.playerInput(engine);
    this.updateGroundedState();
  }

  private executePlayerActions() {
    if (this.isRunning) {
      this.vel.x = this.direction * this.runSpeed;
    } else {
      this.vel.x = 0;
    }

    if (this.wantsJump && (this.isOnGround || this.coyote.allow("jump"))) {
      this.coyote.reset("jump");
      this.vel.y = -this.jumpSpeed;
    }
  }

  public animatePlayer() {
    if (!this.isOnGround) {
      this.graphics.use(playerJumpSheet.getSprite(0, 0));
    } else if (this.isRunning) {
      this.graphics.use(this.runAnimation);
    } else {
      this.graphics.use(playerRunSheet.getSprite(0, 0));
    }
    this.graphics.flipHorizontal = this.direction < 0;
    this.graphics.offset.x = -2 * this.direction;
  }

  public die(engine: Engine) {
    // hide all children
    if (this._activeWeapon) this.removeChild(this._activeWeapon);
    if (this.playerArm) this.removeChild(this.playerArm);
    this.vel = Vector.Zero;
    this.graphics.offset.y = 4;
    this.isDiyng = true;
    this.graphics.use(this.deathAnimation);
    SoundResources.DeathSound.play();
    this.actions.delay(3000).callMethod(() => {
      engine.goToScene("main_menu");
    });
  }

  public update(engine: Engine, delta: number) {
    super.update(engine, delta);

    if (this.isDead) {
      if (!this.isDiyng) {
        this.die(engine);
      }
      return;
    }

    // Get the new state for the player
    this.updatePlayerState(engine);

    // Execute the player actions based on the state
    this.executePlayerActions();

    // Animate player
    this.animatePlayer();
  }

  public activateWeapon(init: boolean = false) {
    if (init || this.isInitialized) {
      if (this._activeWeapon) {
        this.removeChild(this._activeWeapon);
      }
      this._activeWeapon = this.weapons[this._activeWeaponIndex];
      this.addChild(this._activeWeapon);

      if (this._activeWeapon.twoHanded) {
        if (this.children.includes(this.playerArm)) {
          this.removeChild(this.playerArm);
        }
      } else if (!this.children.includes(this.playerArm)) {
        this.addChild(this.playerArm);
      }
    }
  }

  public onInitialize(engine: Engine) {
    super.onInitialize(engine);

    // TODO: remove this
    (window as any).player = this;

    this.body.collisionType = CollisionType.Active;
    this.body.useGravity = true;

    this.collider.useBoxCollider(22, 45, vec(0, 0), vec(-11, -13));

    this.activateWeapon(true);
  }
}

export default Player;

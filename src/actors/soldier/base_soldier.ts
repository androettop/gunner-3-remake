import {
  Actor,
  ActorArgs,
  Animation,
  AnimationDirection,
  AnimationStrategy,
  CollisionType,
  Engine,
  ImageSource,
  range,
  SpriteSheet,
  vec,
  Vector,
} from "excalibur";
import { getSoldierSpriteSheets } from "./resources";
import { CoyoteComponent } from "../../components/input/coyote";
import Weapon from "../weapons/weapon";
import WpPistol from "../weapons/wp_pistol";
import WpShotgun from "../weapons/wp_shotgun";
import { SoundResources } from "../sounds/resources";
import SoldierArm from "./arm";

export interface BaseSoldierParams extends ActorArgs {
  pos: Vector;
  spriteImageSource: ImageSource;
}

abstract class BaseSoldier extends Actor {
  public jumpSpeed = 515;
  public runSpeed = 160;

  public wantsJump = false;
  private isDiyng = false;

  public direction: 1 | -1 = 1;
  public aimDirection: 0 | 1 | -1 = 0;
  public isRunning = false;
  public isOnGround = false;

  private _health = 10; // form 10 to 0

  public spriteSheets: Record<string, SpriteSheet>;

  public weapons: Weapon[] = [new WpPistol(), new WpShotgun()];

  public enabledWeapons: number[] = [0, 1]; // 0 is always enabled

  private _activeWeaponIndex = 0;

  public activeWeapon: Weapon | null = null;

  public get activeWeaponIndex() {
    return this._activeWeaponIndex;
  }

  public set activeWeaponIndex(value: number) {
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
    if (this.isDead) {
      return;
    }
    this._health = value > 10 ? 10 : value < 0 ? 0 : value;
  }

  public get isDead() {
    return this._health === 0;
  }

  private deathAnimation: Animation;

  private runAnimation: Animation;

  private soldierArm: SoldierArm;

  coyote = new CoyoteComponent({
    // allow the soldier to jump for a short time after walking off a ledge
    jump: {
      time: 70,
      condition: () => this.isOnGround,
    },
  });

  constructor({ pos, spriteImageSource, ...rest }: BaseSoldierParams) {
    super({
      pos: pos,
      width: 64,
      height: 64,
      ...rest,
    });
    this.addComponent(this.coyote);
    this.spriteSheets = getSoldierSpriteSheets(spriteImageSource);
    this.soldierArm = new SoldierArm();
    this.deathAnimation = Animation.fromSpriteSheet(
      this.spriteSheets.death,
      range(0, 7),
      50,
      AnimationStrategy.Freeze,
    );
    this.runAnimation = Animation.fromSpriteSheet(
      this.spriteSheets.run,
      range(0, 7),
      50,
    );
  }

  abstract soldierInput(engine: Engine, delta: number): void;

  private updateGroundedState() {
    // All the game surfaces are flat, so we can just check if the soldier is moving vertically
    if (this.vel.y !== 0) {
      this.isOnGround = false;
    }
    if (this.vel.y === 0 && this.oldVel.y === 0) {
      // here we check oldVel to make sure we are not just starting to fall
      this.isOnGround = true;
    }
  }

  private updateSoldierState(engine: Engine, delta: number) {
    this.soldierInput(engine, delta);
    this.updateGroundedState();
  }

  private executeSoldierActions() {
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

  public animateSoldier() {
    if (!this.isOnGround) {
      this.graphics.use(this.spriteSheets.jump.getSprite(0, 0));
    } else if (this.oldPos.x !== this.pos.x) {
      // si la animacion va para el mismo lado que el personaje, pero el personaje se mueve para el otro lado
      // se invierte la animacion

      if (
        ((this.direction < 0 && this.oldPos.x < this.pos.x) ||
          (this.direction > 0 && this.oldPos.x > this.pos.x)) &&
        this.runAnimation.direction === AnimationDirection.Forward
      ) {
        this.runAnimation.reverse();
      } else if (
        ((this.direction < 0 && this.oldPos.x > this.pos.x) ||
          (this.direction > 0 && this.oldPos.x < this.pos.x)) &&
        this.runAnimation.direction === AnimationDirection.Backward
      ) {
        this.runAnimation.reverse();
      }
      this.graphics.use(this.runAnimation);
    } else {
      this.graphics.use(this.spriteSheets.run.getSprite(0, 0));
    }
    this.graphics.flipHorizontal = this.direction < 0;
    this.graphics.offset.x = -2 * this.direction;
  }

  abstract onDie(engine: Engine): void;

  public die(engine: Engine) {
    // hide all children
    if (this.activeWeapon) this.removeChild(this.activeWeapon);
    if (this.soldierArm) this.removeChild(this.soldierArm);
    this.vel = Vector.Zero;
    this.graphics.offset.y = 4;
    this.isDiyng = true;
    this.graphics.use(this.deathAnimation);
    SoundResources.DeathSound.play();
    this.body.collisionType = CollisionType.PreventCollision;
    this.onDie(engine);
  }

  public update(engine: Engine, delta: number) {
    super.update(engine, delta);

    if (this.isDead) {
      if (!this.isDiyng) {
        this.die(engine);
      }
      return;
    }

    // Get the new state for the soldier
    this.updateSoldierState(engine, delta);

    // Execute the soldier actions based on the state
    this.executeSoldierActions();

    // Animate soldier
    this.animateSoldier();
  }

  public activateWeapon(init: boolean = false) {
    if (init || this.isInitialized) {
      if (this.activeWeapon) {
        this.removeChild(this.activeWeapon);
      }
      this.activeWeapon = this.weapons[this._activeWeaponIndex];
      this.addChild(this.activeWeapon);

      if (this.activeWeapon.twoHanded) {
        if (this.children.includes(this.soldierArm)) {
          this.removeChild(this.soldierArm);
        }
      } else if (!this.children.includes(this.soldierArm)) {
        this.addChild(this.soldierArm);
      }
    }
  }

  public onInitialize(engine: Engine) {
    super.onInitialize(engine);

    this.body.collisionType = CollisionType.Active;
    this.body.useGravity = true;

    this.collider.useBoxCollider(22, 45, vec(0, 0), vec(-11, -13));

    this.activateWeapon(true);
  }
}

export default BaseSoldier;

import {
  Actor,
  ActorArgs,
  CollisionType,
  Engine,
  Sound,
  toRadians,
  vec,
  Vector,
} from "excalibur";
import Projectile from "../projectile/projectile";
import Player from "../player/player";

export interface WeaponParams extends ActorArgs {}

abstract class Weapon extends Actor {
  abstract readonly twoHanded: boolean;
  abstract readonly label: string;
  abstract readonly projectileType: typeof Projectile;
  abstract readonly weaponSize: Vector;
  abstract readonly shootThrottle: number;
  abstract readonly shootSound: Sound;

  private isWeaponShooting = false;

  constructor(params?: WeaponParams) {
    super({
      pos: vec(0, 0),
      width: 64,
      height: 64,
      ...params,
    });
  }

  createProjectile() {
    const player = this.parent as Player | null;
    if (!player) {
      return;
    }
    console.log(player);
    const ProjectileClass = this.projectileType;

    this.shootSound.play();

    // player.direction -1 is left, 1 is right
    // player.aimDirection -1 is up (45 degree), 0 is straight, 1 is down (45 degree)
    // get direction in radians taking both into account

    let directionAngle =
      player.aimDirection === 0
        ? 0
        : player.aimDirection === -1
          ? toRadians(-45)
          : toRadians(45);

    if (player.direction === -1) {
      directionAngle = toRadians(180) - directionAngle;
    }

    // @ts-ignore: The projectile will extend the Projectile class.
    const projectile = new ProjectileClass({
      pos: player.pos
        .clone()
        .add(vec(this.weaponSize.x * player.direction, this.weaponSize.y)),
      directionAngle,
    });
    this.scene?.add(projectile);
  }

  shoot() {
    if (!this.isWeaponShooting) {
      this.createProjectile();
      this.isWeaponShooting = true;
      this.actions.delay(this.shootThrottle).callMethod(() => {
        this.isWeaponShooting = false;
      });
    }
  }

  public onInitialize(engine: Engine) {
    super.onInitialize(engine);
    this.body.collisionType = CollisionType.PreventCollision;
  }
}

export default Weapon;

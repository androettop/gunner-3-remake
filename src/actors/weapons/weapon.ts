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
import BaseSoldier from "../soldier/base_soldier";

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
    const soldier = this.parent as BaseSoldier | null;
    if (!soldier) {
      return;
    }
    const ProjectileClass = this.projectileType;

    this.shootSound.play();

    // soldier.direction -1 is left, 1 is right
    // soldier.aimDirection the angle in radians to aim
    // get direction in radians taking both into account

    let directionAngle = soldier.aimDirection;

    if (soldier.direction === -1) {
      directionAngle = toRadians(180) - directionAngle;
    }

    // @ts-ignore: The projectile will extend the Projectile class.
    const projectile = new ProjectileClass({
      pos: soldier.pos
        .clone()
        .add(vec(this.weaponSize.x * soldier.direction, this.weaponSize.y)),
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

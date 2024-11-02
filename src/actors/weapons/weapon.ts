import {
  Actor,
  ActorArgs,
  CollisionType,
  Engine,
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

    // @ts-ignore: The projectile will extend the Projectile class.
    const projectile = new ProjectileClass({
      pos: player.pos
        .clone()
        .add(vec(this.weaponSize.x * player.direction, this.weaponSize.y)),
      directionAngle: player.direction < 0 ? Math.PI : 0,
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

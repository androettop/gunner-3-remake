import { Actor, ActorArgs, CollisionType, Engine, vec } from "excalibur";

export interface WeaponParams extends ActorArgs {}

abstract class Weapon extends Actor {
  abstract readonly twoHanded: boolean;
  abstract readonly label: string;

  constructor(params?: WeaponParams) {
    super({
      pos: vec(0, 0),
      width: 64,
      height: 64,
      ...params,
    });
  }

  abstract shoot(): void;

  public onInitialize(engine: Engine) {
    super.onInitialize(engine);
    this.body.collisionType = CollisionType.PreventCollision;
  }
}

export default Weapon;

import { Actor, ActorArgs } from "excalibur";

export default abstract class BaseCreature extends Actor {
  public bleeds: boolean = true;

  public abstract get health(): number;

  public abstract set health(_value: number);

  constructor(config?: ActorArgs) {
    super({ z: 1, ...config });
  }
}

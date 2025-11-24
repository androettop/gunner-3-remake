import { Actor, ActorArgs } from "excalibur";

export default class BaseEnemy extends Actor {
  public bleeds = true;

  public get health(): number {
    return 1;
  }

  public set health(value: number) {
    // no-op
  }

  constructor(config?: ActorArgs) {
    super(config);
  }
}

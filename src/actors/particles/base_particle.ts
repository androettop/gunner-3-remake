import {
  Actor,
  ActorArgs,
  Animation,
  AnimationStrategy,
  Engine,
  SpriteSheet,
} from "excalibur";

export default class BaseParticle extends Actor {
  animation: Animation;

  constructor({
    sprite,
    range,
    duration,
    ...config
  }: ActorArgs & { sprite: SpriteSheet; range: number[]; duration: number }) {
    super(config);
    this.animation = Animation.fromSpriteSheet(
      sprite,
      range,
      duration,
      AnimationStrategy.End,
    );
    this.animation.events.on("end", () => {
      this.kill();
    });
    console.log("BaseParticle created");
  }

  public onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    this.graphics.use(this.animation);
  }
}

import {
  Actor,
  ActorArgs,
  Animation,
  AnimationStrategy,
  Engine,
  SpriteSheet,
} from "excalibur";

export interface BaseParticleParams extends ActorArgs {
  sprite: SpriteSheet;
  range: number[];
  duration: number;
  autoStart?: boolean;
  gravity?: boolean;
  autoDestroy?: boolean;
  animStrategy?: AnimationStrategy;
}

export default class BaseParticle extends Actor {
  animation: Animation;
  autoStart: boolean;
  autoDestroy: boolean;
  gravity: boolean;

  constructor({
    sprite,
    range,
    duration,
    autoStart = true,
    gravity = false,
    autoDestroy = true,
    animStrategy = AnimationStrategy.End,
    ...config
  }: BaseParticleParams) {
    super({
      ...config,
      z: 1,
    });
    this.animation = Animation.fromSpriteSheet(
      sprite,
      range,
      duration,
      animStrategy,
    );
    this.autoStart = autoStart;
    this.autoDestroy = autoDestroy;
    this.gravity = gravity;
  }

  public onInitialize(engine: Engine): void {
    super.onInitialize(engine);

    if (!this.autoStart) {
      this.animation.pause();
    }

    if (this.autoDestroy) {
      this.animation.events.on("end", () => {
        this.kill();
      });
    }

    if (this.gravity) {
      this.acc = engine.physics.gravity.clone();
    }

    this.graphics.use(this.animation);
  }
}

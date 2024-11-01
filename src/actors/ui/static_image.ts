import { Actor, ActorArgs, Graphic, Vector } from "excalibur";

export interface StaticImageParams extends ActorArgs {
  pos: Vector;
  sprite: Graphic;
  hoverSprite?: Graphic;
  activeSprite?: Graphic;
}

class StaticImage extends Actor {
  sprite: Graphic;
  hoverSprite?: Graphic;
  activeSprite?: Graphic;

  constructor({
    pos,
    sprite,
    hoverSprite,
    activeSprite,
    ...rest
  }: StaticImageParams) {
    super({
      pos: pos,
      width: sprite.width,
      height: sprite.height,
      ...rest,
    });

    this.sprite = sprite;
    this.hoverSprite = hoverSprite;
    this.activeSprite = activeSprite;
  }

  onInitialize() {
    this.graphics.use(this.sprite);

    if (this.hoverSprite) {
      this.on("pointerenter", () => {
        if (this.hoverSprite) {
          this.graphics.use(this.hoverSprite);
        }
      });
      this.on("pointerleave", () => {
        if (this.hoverSprite) {
          this.graphics.use(this.sprite);
        }
      });
    }

    if (this.activeSprite) {
      this.on("pointerdown", () => {
        if (this.activeSprite) {
          this.graphics.use(this.activeSprite);
        }
      });
    }
  }
}

export default StaticImage;

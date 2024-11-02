import { Actor, ActorArgs, Graphic, Vector } from "excalibur";

export interface StaticImageParams extends ActorArgs {
  pos: Vector;
  sprite: Graphic;
  anchor?: Vector;
  hoverSprite?: Graphic;
  activeSprite?: Graphic;
  width?: number;
  height?: number;
}

class StaticImage extends Actor {
  private _sprite: Graphic;
  hoverSprite?: Graphic;
  activeSprite?: Graphic;

  public get sprite() {
    return this._sprite;
  }

  public set sprite(sprite: Graphic) {
    this._sprite = sprite;
    if (this.isInitialized) {
      this.graphics.use(sprite);
    }
  }

  constructor({
    pos,
    sprite,
    anchor = Vector.Zero,
    hoverSprite,
    activeSprite,
    width = sprite.width,
    height = sprite.height,
    ...rest
  }: StaticImageParams) {
    super({
      pos: pos,
      width,
      height,
      anchor,
      ...rest,
    });

    this._sprite = sprite;
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

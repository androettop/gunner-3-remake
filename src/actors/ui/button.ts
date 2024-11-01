import { Actor, Graphic, Handler, Vector, PointerEvent } from "excalibur";

export interface ButtonParams {
  pos: Vector;
  sprite: Graphic;
  onPress: Handler<PointerEvent>;
}

export class Button extends Actor {
  onPress: Handler<PointerEvent>;
  sprite: Graphic;
  pos: Vector;

  constructor({ pos, sprite, onPress }: ButtonParams) {
    super({
      pos: pos,
      width: sprite.width,
      height: sprite.height,
    });

    this.onPress = onPress;
    this.sprite = sprite;
    this.pos = pos;
  }

  onInitialize() {
    this.graphics.add(this.sprite);
    this.on("pointerup", this.onPress);
  }
}

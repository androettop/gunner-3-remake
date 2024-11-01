import { Handler, PointerEvent } from "excalibur";
import StaticImage, { StaticImageParams } from "./static_image";

export interface ButtonParams extends StaticImageParams {
  onPress: Handler<PointerEvent>;
}

class Button extends StaticImage {
  onPress: Handler<PointerEvent>;

  constructor({
    pos,
    sprite,
    hoverSprite,
    activeSprite,
    onPress,
  }: ButtonParams) {
    super({ pos, sprite, hoverSprite, activeSprite });

    this.onPress = onPress;
  }

  onInitialize() {
    super.onInitialize();

    this.on("pointerup", (e) => {
      this.onPress(e);
    });
  }
}

export default Button;

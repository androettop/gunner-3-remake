import { Actor, Engine, vec } from "excalibur";
import { getPlayer } from "../../helpers/player";
import { healthIndicatorSpriteSheet } from "./resources";

class HealtIndicator extends Actor {
  constructor() {
    super({
      pos: vec(4, 4),
      anchor: vec(0, 0),
      width: 64,
      height: 64,
    });
  }

  public update() {
    if (this.scene) {
      const player = getPlayer(this.scene);
      const health =
        player.health > 10 ? 10 : player.health < 0 ? 0 : player.health;
      this.graphics.use(healthIndicatorSpriteSheet.getSprite(health, 0));
    }
  }

  public onInitialize(engine: Engine) {
    super.onInitialize(engine);
  }
}

export default HealtIndicator;

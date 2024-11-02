import { Actor, Engine, vec } from "excalibur";
import { getPlayer } from "../../helpers/player";
import { healthIndicatorSpriteSheet } from "./resources";
import Player from "../player/player";

class HealtIndicator extends Actor {
  player?: Player;

  constructor() {
    super({
      pos: vec(4, 4),
      anchor: vec(0, 0),
      width: 64,
      height: 64,
    });
  }

  public update() {
    if (!this.player && this.scene) {
      this.player = getPlayer(this.scene);
    }
    if (this.player) {
      const health =
        this.player.health > 10
          ? 10
          : this.player.health < 0
            ? 0
            : this.player.health;
      this.graphics.use(healthIndicatorSpriteSheet.getSprite(health, 0));
    }
  }

  public onInitialize(engine: Engine) {
    console.log(engine);
    if (this.scene) {
      this.player = getPlayer(this.scene);
    }
  }
}

export default HealtIndicator;

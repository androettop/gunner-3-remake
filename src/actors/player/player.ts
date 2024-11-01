import { Actor, SpriteSheet, vec } from "excalibur";
import { PlayerResources } from "./resources";

const spriteSheet = SpriteSheet.fromImageSource({
  image: PlayerResources.PlayerSprites,
  grid: {
    rows: 8,
    columns: 8,
    spriteWidth: 64,
    spriteHeight: 64,
  },
});

class Player extends Actor {
  constructor() {
    super({
      pos: vec(150, 150),
      width: 64,
      height: 64,
    });
  }

  onInitialize() {
    this.graphics.add(spriteSheet.getSprite(0, 0));
    this.on("pointerup", () => {
      alert("yo");
    });
  }
}

export default Player;

import { Engine } from "excalibur";
import { loader } from "./resources";
import { Player } from "./actors/player/player";

class Game extends Engine {
  constructor() {
    super({
      width: 800,
      height: 600,
      viewport: { width: 1280, height: 960 },
      resolution: { width: 640, height: 480 },
      antialiasing: false,
    });
  }
  initialize() {
    const player = new Player();
    this.add(player);

    this.start(loader);
  }
}

export const game = new Game();
game.initialize();

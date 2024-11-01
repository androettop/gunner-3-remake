import { Engine } from "excalibur";
import { loader } from "./resources";
import { Player } from "./actors/player/player";

class Game extends Engine {
  constructor() {
    super({ width: 800, height: 600 });
  }
  initialize() {
    const player = new Player();
    this.add(player);

    this.start(loader);
  }
}

export const game = new Game();
game.initialize();

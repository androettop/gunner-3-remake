import { Color, Engine } from "excalibur";
import MainMenu from "./scenes/main_menu/main_menu";

class Game extends Engine {
  constructor() {
    super({
      width: 800,
      height: 600,
      viewport: { width: 1280, height: 960 },
      resolution: { width: 640, height: 480 },
      antialiasing: false,
      backgroundColor: Color.Black,
    });
  }
  initialize() {
    this.add("main_menu", new MainMenu());
    this.goToScene("main_menu");
  }
}

export const game = new Game();
game.initialize();
game.start();

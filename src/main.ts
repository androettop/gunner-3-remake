import { Color, Engine } from "excalibur";
import MainMenu from "./scenes/main_menu/main_menu";
import DebugScene from "./scenes/debug_scene/debug_scene";
import { setupDebugTools } from "./debug";

class Game extends Engine {
  constructor() {
    super({
      viewport: { width: 1280, height: 960 },
      resolution: { width: 640, height: 480 },
      antialiasing: false,
      backgroundColor: Color.Black,
    });
  }
  initialize() {
    this.add("main_menu", new MainMenu());
    this.add("debug_scene", new DebugScene());
    this.goToScene("main_menu");
  }
}

export const game = new Game();
game.initialize();
game.start();

setupDebugTools(game);

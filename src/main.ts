import { Color, Engine, vec } from "excalibur";
import MainMenu from "./scenes/main_menu/main_menu";
import DebugScene from "./scenes/debug_scene/debug_scene";
import { setupDebugTools } from "./debug";
import { createLoader } from "./helpers/resources";
import { UiResources } from "./actors/ui/resources";
import { SoundResources } from "./actors/sounds/resources";
import { WorldResources } from "./actors/world/resources";
import { PlayerResources } from "./actors/player/resources";

class Game extends Engine {
  constructor() {
    super({
      canvasElementId: "game",
      viewport: { width: 1280, height: 960 },
      resolution: { width: 640, height: 480 },
      antialiasing: false,
      backgroundColor: Color.Black,
    });

    this.physics.gravity = vec(0, 1000);
  }
  initialize() {
    this.add("main_menu", new MainMenu());
    this.add("debug_scene", new DebugScene());

    this.start(
      createLoader(
        UiResources,
        SoundResources,
        WorldResources,
        PlayerResources,
      ),
    );
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    this.goToScene("main_menu");
  }
}

export const game = new Game();

game.initialize();

setupDebugTools(game);

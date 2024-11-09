import { Color, Engine, vec } from "excalibur";
import MainMenu from "./scenes/main_menu/main_menu";
import { setupDebugTools } from "./debug";
import { createLoader } from "./helpers/resources";
import { UiResources } from "./actors/ui/resources";
import { SoundResources } from "./actors/sounds/resources";
import { WorldResources } from "./actors/world/resources";
import { TextResources } from "./actors/text/resources";
import { ProjectileResources } from "./actors/projectile/resources";
import { SoldierResources } from "./actors/soldier/resources";

class Game extends Engine {
  constructor() {
    const scale = 2;
    const width = 640;
    const height = 480;
    super({
      canvasElementId: "game",
      viewport: { width: width * scale, height: height * scale },
      resolution: { width, height },
      antialiasing: false,
      backgroundColor: Color.Black,
    });

    this.physics.gravity = vec(0, 1000);
  }
  initialize() {
    this.add("main_menu", new MainMenu());
    this.start(
      createLoader(
        UiResources,
        SoundResources,
        WorldResources,
        SoldierResources,
        TextResources,
        ProjectileResources,
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

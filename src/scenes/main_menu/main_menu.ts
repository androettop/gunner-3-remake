import {
  DefaultLoader,
  Engine,
  Scene,
  SceneActivationContext,
  vec,
} from "excalibur";
import { UiResources, uiSpriteSheet } from "../../actors/ui/resources";
import { SoundResources } from "../../actors/sounds/resources";
import Button from "../../actors/ui/button";
import { GAME_HEIGHT, GAME_WIDTH } from "../../helpers/consts";
import StaticImage from "../../actors/ui/static_image";

class MainMenu extends Scene {
  /**
   * Preload any assets, called once
   */
  override onPreLoad(loader: DefaultLoader) {
    for (const res of Object.values(UiResources)) {
      loader.addResource(res);
    }
    for (const res of Object.values(SoundResources)) {
      loader.addResource(res);
    }
  }

  startButton = new Button({
    pos: vec(GAME_WIDTH / 2, 318),
    sprite: uiSpriteSheet.sprites[0],
    hoverSprite: uiSpriteSheet.sprites[1],
    onPress: () => {
      console.log("Start button pressed");
    },
  });

  loadButton = new Button({
    pos: vec(GAME_WIDTH / 2, 318 + 40),
    sprite: uiSpriteSheet.sprites[2],
    hoverSprite: uiSpriteSheet.sprites[3],
    onPress: () => {
      console.log("Load button pressed");
    },
  });

  exitButton = new Button({
    pos: vec(GAME_WIDTH / 2, 318 + 40 * 2),
    sprite: uiSpriteSheet.sprites[4],
    hoverSprite: uiSpriteSheet.sprites[5],
    onPress: () => {
      console.log("Exit button pressed");
    },
  });

  gunner3Logo = new StaticImage({
    pos: vec(GAME_WIDTH / 2, 140),
    sprite: uiSpriteSheet.sprites[6],
  });

  gunner3Character = new StaticImage({
    pos: vec(GAME_WIDTH - 120, GAME_HEIGHT - 170),
    sprite: uiSpriteSheet.sprites[7],
  });

  /**
   * Start-up logic, called once
   */
  public onInitialize(engine: Engine) {}

  /**
   * Each time the scene is entered (Engine.goToScene)
   */
  public onActivate(ctx: SceneActivationContext) {
    // start music
    SoundResources.MainMenuMusic.loop = true;
    SoundResources.MainMenuMusic.play(0.3);

    // draw logo
    this.add(this.gunner3Logo);

    // draw gunner 3 character
    this.add(this.gunner3Character);

    // draw buttons
    this.add(this.startButton);
    this.add(this.loadButton);
    this.add(this.exitButton);
  }

  /**
   * Each time the scene is exited (Engine.goToScene)
   */
  public onDeactivate(ctx: SceneActivationContext) {}
}

export default MainMenu;

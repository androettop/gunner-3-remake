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
    pos: vec(100, 100),
    sprite: uiSpriteSheet.getSprite(0, 0),
    onPress: () => {
      console.log("Start button pressed");
    },
  });

  /**
   * Start-up logic, called once
   */
  public onInitialize(engine: Engine) {}

  /**
   * Each time the scene is entered (Engine.goToScene)
   */
  public onActivate(ctx: SceneActivationContext) {
    SoundResources.MainMenuMusic.loop = true;
    SoundResources.MainMenuMusic.play(0.3);

    // draw uiSpriteSheet sprite number 0
    this.add(this.startButton);
  }

  /**
   * Each time the scene is exited (Engine.goToScene)
   */
  public onDeactivate(ctx: SceneActivationContext) {}
}

export default MainMenu;

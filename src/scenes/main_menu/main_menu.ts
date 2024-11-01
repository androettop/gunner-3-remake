import {
  Color,
  DefaultLoader,
  Engine,
  Scene,
  SceneActivationContext,
} from "excalibur";
import { UiResources } from "../../actors/ui/resources";

class MainMenu extends Scene {
  /**
   * Preload any assets, called once
   */
  override onPreLoad(loader: DefaultLoader) {
    for (const res of Object.values(UiResources)) {
      loader.addResource(res);
    }
  }

  /**
   * Start-up logic, called once
   */
  public onInitialize(engine: Engine) {
    // put a black background on the screen
    engine.backgroundColor = Color.Black;
  }

  /**
   * Each time the scene is entered (Engine.goToScene)
   */
  public onActivate(ctx: SceneActivationContext) {}

  /**
   * Each time the scene is exited (Engine.goToScene)
   */
  public onDeactivate(ctx: SceneActivationContext) {}
}

export default MainMenu;

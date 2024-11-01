import { DefaultLoader, Scene } from "excalibur";
import { SoundResources } from "../../actors/sounds/resources";
import Player from "../../actors/player/player";
import { PlayerResources } from "../../actors/player/resources";

class DebugScene extends Scene {
  /**
   * Preload any assets, called once
   */
  override onPreLoad(loader: DefaultLoader) {
    for (const res of Object.values(PlayerResources)) {
      loader.addResource(res);
    }
    for (const res of Object.values(SoundResources)) {
      loader.addResource(res);
    }
  }

  player = new Player();

  /**
   * Start-up logic, called once
   */
  public onInitialize() {}

  /**
   * Each time the scene is entered (Engine.goToScene)
   */
  public onActivate() {
    // start music
    SoundResources.Level01Music.loop = true;
    SoundResources.Level01Music.play(0.3);

    // add player to scene
    this.add(this.player);
  }

  /**
   * Each time the scene is exited (Engine.goToScene)
   */
  public onDeactivate() {
    // stop music
    SoundResources.Level01Music.stop();
  }
}

export default DebugScene;

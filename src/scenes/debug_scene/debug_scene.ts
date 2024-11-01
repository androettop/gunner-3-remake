import { DefaultLoader, Scene, vec } from "excalibur";
import { SoundResources } from "../../actors/sounds/resources";
import Player from "../../actors/player/player";
import { PlayerResources } from "../../actors/player/resources";
import GrassPlatform from "../../actors/world/grass_platform";
import { GAME_HEIGHT, GAME_WIDTH } from "../../helpers/consts";
import { WorldResources } from "../../actors/world/resources";
import { loadResources } from "../../helpers/resources";
class DebugScene extends Scene {
  /**
   * Preload any assets, called once
   */
  override onPreLoad(loader: DefaultLoader) {
    loadResources(loader, SoundResources, WorldResources, PlayerResources);
  }

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

    const player = new Player({
      pos: vec(GAME_WIDTH / 2, GAME_HEIGHT / 2),
    });
    this.add(player);

    for (let i = 0; i < Math.ceil(GAME_WIDTH / 64); i++) {
      const grassPlatform = new GrassPlatform({
        pos: vec(32 + i * 64, GAME_HEIGHT - 10),
      });
      this.add(grassPlatform);
    }
  }

  /**
   * Each time the scene is exited (Engine.goToScene)
   */
  public onDeactivate() {
    // stop music
    SoundResources.Level01Music.stop();
    this.clear();
  }
}

export default DebugScene;
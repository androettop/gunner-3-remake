import { Color, Scene, vec } from "excalibur";
import { SoundResources } from "../../actors/sounds/resources";
import Player from "../../actors/player/player";
import GrassPlatform from "../../actors/world/grass_platform";
import { GAME_HEIGHT, GAME_WIDTH } from "../../helpers/consts";
import HealtIndicator from "../../actors/ui/healt_indicator";
import StaticImage from "../../actors/ui/static_image";
import { backgroundSpriteSheet } from "../../actors/world/resources";
class DebugScene extends Scene {
  /**
   * Start-up logic, called once
   */
  public onInitialize() {
    this.backgroundColor = Color.fromHex("29619c");
  }

  /**
   * Each time the scene is entered (Engine.goToScene)
   */
  public onActivate() {
    // start music
    SoundResources.Level01Music.loop = true;
    SoundResources.Level01Music.play(0.3);

    const bg = new StaticImage({
      pos: vec(0, 0),
      sprite: backgroundSpriteSheet.getSprite(0, 0),
    });
    bg.scale.x = 100;
    this.add(bg);

    const player = new Player({
      pos: vec(GAME_WIDTH / 2, GAME_HEIGHT / 2),
    });
    const healtIndicator = new HealtIndicator();

    this.add(player);
    this.add(healtIndicator);

    for (let i = 0; i < Math.ceil(GAME_WIDTH / 64); i++) {
      const grassPlatform = new GrassPlatform({
        pos: vec(i * 64, GAME_HEIGHT - 20),
      });
      this.add(grassPlatform);
    }

    const grassPlatform2 = new GrassPlatform({
      pos: vec(GAME_WIDTH / 2, GAME_HEIGHT - 20 - 128),
    });
    this.add(grassPlatform2);
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

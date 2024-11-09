import { Color, Scene } from "excalibur";
import { SoundResources } from "../../actors/sounds/resources";
import HealtIndicator from "../../actors/ui/healt_indicator";
import WeaponsIndicator from "../../actors/ui/weapons_indicator";
import { level01 } from "../../levels/level01";
import { initLevel } from "../../levels/renderer";

class Level01 extends Scene {
  private initHUD() {
    const healtIndicator = new HealtIndicator();
    const weaponsIndicator = new WeaponsIndicator();

    this.add(healtIndicator);
    this.add(weaponsIndicator);
  }

  /**
   * Start-up logic, called once
   */
  public onInitialize() {
    this.backgroundColor = Color.fromHex("29619c");
    initLevel(level01, this);
    this.initHUD();
  }

  /**
   * Each time the scene is entered (Engine.goToScene)
   */
  public onActivate() {
    // start music
    SoundResources.Level01Music.loop = true;
    SoundResources.Level01Music.play(0.3);
  }

  /**
   * Each time the scene is exited (Engine.goToScene)
   */
  public onDeactivate() {
    // stop music
    SoundResources.Level01Music.stop();
  }
}

export default Level01;

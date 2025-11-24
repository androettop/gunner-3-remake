import { Scene } from "excalibur";
import HealthIndicator from "../../actors/ui/health_indicator";
import WeaponsIndicator from "../../actors/ui/weapons_indicator";
import { level01 } from "../../levels/level01";
import { initLevel } from "../../levels/renderer";

class Level01 extends Scene {
  private initHUD() {
    const healthIndicator = new HealthIndicator();
    const weaponsIndicator = new WeaponsIndicator();

    this.add(healthIndicator);
    this.add(weaponsIndicator);
  }

  /**
   * Start-up logic, called once
   */
  public onInitialize() {
    this.backgroundColor = level01.backgroundColor;
    initLevel(level01, this);
    this.initHUD();
  }

  /**
   * Each time the scene is entered (Engine.goToScene)
   */
  public onActivate() {
    // start music
    level01.music.loop = true;
    level01.music.play(0.3);
  }

  /**
   * Each time the scene is exited (Engine.goToScene)
   */
  public onDeactivate() {
    // stop music
    level01.music.stop();
  }
}

export default Level01;

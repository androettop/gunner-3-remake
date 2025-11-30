import { Scene } from "excalibur";

import { Level } from "./types";
import HealthIndicator from "../actors/ui/health_indicator";
import WeaponsIndicator from "../actors/ui/weapons_indicator";
import { initLevel } from "./renderer";

const levelSceneFactory = (level: Level) => {
  return class extends Scene {
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
      this.backgroundColor = level.backgroundColor;
      initLevel(level, this);
      this.initHUD();
    }

    /**
     * Each time the scene is entered (Engine.goToScene)
     */
    public onActivate() {
      // start music
      level.music.loop = true;
      level.music.play(0.3);
    }

    /**
     * Each time the scene is exited (Engine.goToScene)
     */
    public onDeactivate() {
      // stop music
      level.music.stop();
    }
  };
};

export default levelSceneFactory;

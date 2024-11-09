import { Color, Scene, vec } from "excalibur";
import { SoundResources } from "../../actors/sounds/resources";
import Player from "../../actors/player/player";
import GrassPlatform from "../../actors/world/grass_platform";
import { GAME_HEIGHT, GAME_WIDTH } from "../../helpers/consts";
import HealtIndicator from "../../actors/ui/healt_indicator";
import StaticImage from "../../actors/ui/static_image";
import { backgroundSpriteSheet } from "../../actors/world/resources";
import WeaponsIndicator from "../../actors/ui/weapons_indicator";
import DirtBlock from "../../actors/world/dirt_block";
import EnemySoldier from "../../actors/enemies/enemy_soldier";
class DebugScene extends Scene {
  private player: Player | null = null;

  private initBackground() {
    this.backgroundColor = Color.fromHex("29619c");
    const sky = new StaticImage({
      pos: vec(0, 0),
      sprite: backgroundSpriteSheet.getSprite(0, 0),
    });
    sky.scale.x = 100;
    this.add(sky);

    const vegetationSprite = backgroundSpriteSheet.getSprite(2, 0);
    // add 3 bgs to fill the screen
    for (let i = 0; i < 3; i++) {
      const vegetation = new StaticImage({
        pos: vec(i * vegetationSprite.width - 40, 100),
        sprite: vegetationSprite,
      });
      this.add(vegetation);
    }
  }

  private initPlayer() {
    this.player = new Player({
      pos: vec(GAME_WIDTH / 2, GAME_HEIGHT / 2),
    });
    this.add(this.player);
  }

  private initEnemies() {
    const soldier = new EnemySoldier({
      type: "enemy-soldier",
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2,
      properties: {
        health: 10,
      },
    });
    this.add(soldier);
  }

  private initMap() {
    // add 2 rows of DirtBlock (64x64) at the bottom of the screen
    for (let i = 0; i < Math.ceil(GAME_WIDTH / 64); i++) {
      const dirtBlock = new DirtBlock({
        pos: vec(i * 64, GAME_HEIGHT - 64),
      });
      this.add(dirtBlock);
      const dirtBlock2 = new DirtBlock({
        pos: vec(i * 64, GAME_HEIGHT - 128),
      });
      this.add(dirtBlock2);
    }

    // add 1 columns of DirtBlock (64x64) at the left  and right of the screen
    for (let i = 0; i < Math.ceil(GAME_HEIGHT / 64); i++) {
      const dirtBlock = new DirtBlock({
        pos: vec(-64, i * 64),
      });
      this.add(dirtBlock);
      const dirtBlock2 = new DirtBlock({
        pos: vec(GAME_WIDTH, i * 64),
      });
      this.add(dirtBlock2);
    }

    // add the grass platform
    for (let i = 0; i < Math.ceil(GAME_WIDTH / 64); i++) {
      const grassPlatform = new GrassPlatform({
        pos: vec(i * 64, GAME_HEIGHT - 128),
      });
      this.add(grassPlatform);
    }
  }

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
    this.initBackground();
    this.initMap();
    this.initEnemies();
    this.initPlayer();
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

export default DebugScene;

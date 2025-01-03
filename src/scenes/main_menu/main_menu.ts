import { Color, Scene, Text, vec } from "excalibur";
import { mainMenuSpriteSheet } from "../../actors/ui/resources";
import { SoundResources } from "../../actors/sounds/resources";
import Button from "../../actors/ui/button";
import { GAME_HEIGHT, GAME_WIDTH } from "../../helpers/consts";
import StaticImage from "../../actors/ui/static_image";
import { spriteFont2Light } from "../../actors/text/resources";
import DebugScene from "../debug_scene/debug_scene";

class MainMenu extends Scene {
  startButton = new Button({
    pos: vec(GAME_WIDTH / 2, 320),
    sprite: mainMenuSpriteSheet.sprites[0],
    hoverSprite: mainMenuSpriteSheet.sprites[1],
    anchor: vec(0.5, 0),
    onPress: () => {
      this.engine.removeScene("debug_scene");
      this.engine.add("debug_scene", new DebugScene());
      this.engine.goToScene("debug_scene");
    },
  });

  loadButton = new Button({
    pos: vec(GAME_WIDTH / 2, 320 + 40),
    sprite: mainMenuSpriteSheet.sprites[2],
    hoverSprite: mainMenuSpriteSheet.sprites[3],
    anchor: vec(0.5, 0),
    onPress: () => {
      console.log("Load button pressed");
    },
  });

  exitButton = new Button({
    pos: vec(GAME_WIDTH / 2, 320 + 40 * 2),
    sprite: mainMenuSpriteSheet.sprites[4],
    hoverSprite: mainMenuSpriteSheet.sprites[5],
    anchor: vec(0.5, 0),
    onPress: () => {
      console.log("Exit button pressed");
    },
  });

  gunner3Logo = new StaticImage({
    pos: vec(GAME_WIDTH / 2, 32),
    anchor: vec(0.5, 0),
    sprite: mainMenuSpriteSheet.sprites[6],
  });

  gunner3Character = new StaticImage({
    pos: vec(GAME_WIDTH - 32, GAME_HEIGHT - 32),
    anchor: vec(1, 1),
    sprite: mainMenuSpriteSheet.sprites[7],
  });

  /**
   * Start-up logic, called once
   */
  public onInitialize() {}

  public initCredits() {
    const text = new Text({
      text: "KNPMASTER 2000",
      font: spriteFont2Light,
      color: Color.Red,
    });

    const textIndicator = new StaticImage({
      pos: vec(9, GAME_HEIGHT - 8),
      anchor: vec(0, 1),
      sprite: text,
    });

    this.add(textIndicator);
  }

  /**
   * Each time the scene is entered (Engine.goToScene)
   */
  public onActivate() {
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

    // draw credits
    this.initCredits();
  }

  /**
   * Each time the scene is exited (Engine.goToScene)
   */
  public onDeactivate() {
    // stop music
    SoundResources.MainMenuMusic.stop();
  }
}

export default MainMenu;

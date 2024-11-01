import { DefaultLoader, Scene, vec } from "excalibur";
import { UiResources, uiSpriteSheet } from "../../actors/ui/resources";
import { SoundResources } from "../../actors/sounds/resources";
import Button from "../../actors/ui/button";
import { GAME_HEIGHT, GAME_WIDTH } from "../../helpers/consts";
import StaticImage from "../../actors/ui/static_image";

class MainMenu extends Scene {
  startButton = new Button({
    pos: vec(GAME_WIDTH / 2, 328),
    sprite: uiSpriteSheet.sprites[0],
    hoverSprite: uiSpriteSheet.sprites[1],
    onPress: () => {
      console.log("Start button pressed");
    },
  });

  loadButton = new Button({
    pos: vec(GAME_WIDTH / 2, 328 + 40),
    sprite: uiSpriteSheet.sprites[2],
    hoverSprite: uiSpriteSheet.sprites[3],
    onPress: () => {
      console.log("Load button pressed");
    },
  });

  exitButton = new Button({
    pos: vec(GAME_WIDTH / 2, 328 + 40 * 2),
    sprite: uiSpriteSheet.sprites[4],
    hoverSprite: uiSpriteSheet.sprites[5],
    onPress: () => {
      console.log("Exit button pressed");
    },
  });

  gunner3Logo = new StaticImage({
    pos: vec(GAME_WIDTH / 2, 150),
    sprite: uiSpriteSheet.sprites[6],
  });

  gunner3Character = new StaticImage({
    pos: vec(GAME_WIDTH - 120, GAME_HEIGHT - 170),
    sprite: uiSpriteSheet.sprites[7],
  });

  knpmasterLabel = new StaticImage({
    pos: vec(96.5, GAME_HEIGHT - 60),
    sprite: uiSpriteSheet.sprites[8],
  });

  androettopLabel = new StaticImage({
    pos: vec(81.5, GAME_HEIGHT - 40),
    sprite: uiSpriteSheet.sprites[9],
  });

  tributeLabel = new StaticImage({
    pos: vec(180, GAME_HEIGHT - 20),
    sprite: uiSpriteSheet.sprites[10],
  });

  /**
   * Start-up logic, called once
   */
  public onInitialize() {}

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

    // draw labels
    this.add(this.knpmasterLabel);
    this.add(this.androettopLabel);
    this.add(this.tributeLabel);
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

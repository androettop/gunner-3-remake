import { Sound } from "excalibur";
import mainMenuMusic from "../../assets/sounds/main_menu.mp3";
import level01Music from "../../assets/sounds/level_01.mp3";
import weapon01Sound from "../../assets/sounds/wp_01.mp3";

export const SoundResources = {
  MainMenuMusic: new Sound(mainMenuMusic),
  Level01Music: new Sound(level01Music),
  Weapon01Sound: new Sound(weapon01Sound),
} as const;

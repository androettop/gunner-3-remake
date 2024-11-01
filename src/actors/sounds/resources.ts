import { Sound } from "excalibur";
import mainMenuMusic from "../../assets/sounds/main_menu.mp3";

export const SoundResources = {
  MainMenuMusic: new Sound(mainMenuMusic),
} as const;

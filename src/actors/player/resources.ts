import { ImageSource } from "excalibur";
import playerSprites from "../../assets/images/player/player.png";

export const PlayerResources = {
  PlayerSprites: new ImageSource(playerSprites),
} as const;

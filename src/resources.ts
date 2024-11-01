import { Loader } from "excalibur";
import { PlayerResources } from "./actors/player/resources";

export const loader = new Loader();
for (const res of Object.values(PlayerResources)) {
  loader.addResource(res);
}

import { Engine, vec } from "excalibur";
import { EnemySoldierEntity } from "../../levels/types";
import BaseSoldier from "../soldier/base_soldier";
import { SoldierResources } from "../soldier/resources";

class EnemySoldier extends BaseSoldier {
  constructor(entity: EnemySoldierEntity) {
    super({
      pos: vec(entity.x, entity.y),
      spriteImageSource: SoldierResources.EnemySprites,
    });
    this.health = entity.properties.health;
  }
  public runSpeed = 100;

  public soldierInput() {
    const baseX = 250;
    this.isRunning = true;
    if (this.direction === 1 && this.pos.x > baseX + 200) {
      this.direction = -1;
    } else if (this.direction === -1 && this.pos.x < baseX) {
      this.direction = 1;
    }
  }

  public onDie() {}

  public onInitialize(engine: Engine) {
    super.onInitialize(engine);
    // TODO: remove this
    (window as any).enemy = this;
  }
}

export default EnemySoldier;

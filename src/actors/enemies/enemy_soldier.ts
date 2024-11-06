import { Engine, Vector } from "excalibur";
import BaseSoldier from "../soldier/base_soldier";
import { SoldierResources } from "../soldier/resources";

export interface EnemySoldierParams {
  pos: Vector;
}

class EnemySoldier extends BaseSoldier {
  constructor({ pos }: EnemySoldierParams) {
    super({
      pos,
      spriteImageSource: SoldierResources.EnemySprites,
    });
  }
  public runSpeed = 100;

  public soldierInput() {
    /*
    move right: this.direction = 1; this.isRunning = true;
    move left: this.direction = -1; this.isRunning = true;
    stop moving: this.isRunning = false;
    shoot this.activeWeapon?.shoot();
    */

    // move for 200px to the right and then to the left
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

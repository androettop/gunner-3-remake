import { Engine, vec } from "excalibur";
import { EnemySoldierEntity } from "../../levels/types";
import BaseSoldier from "../soldier/base_soldier";
import { SoldierResources } from "../soldier/resources";
import { getPlayer } from "../../helpers/player";

class EnemySoldier extends BaseSoldier {
  constructor(entity: EnemySoldierEntity) {
    super({
      pos: vec(entity.x, entity.y),
      spriteImageSource: SoldierResources.EnemySprites,
    });
    this.health = entity.properties.health;
  }
  public runSpeed = 100;
  public maxViewDistance = 300;
  public shootThrottle = 1500;
  public isPatrolling = true;
  private lastShootTime = 0;

  public soldierInput() {
    if (this.isPatrolling) {
      const baseX = 250;
      this.isRunning = true;
      if (this.direction === 1 && this.pos.x > baseX + 200) {
        //
        this.direction = -1;
      } else if (this.direction === -1 && this.pos.x < baseX) {
        this.direction = 1;
      }
    } else {
      this.isRunning = false;
    }
  }

  public onDie() {}

  public onHurt() {}

  public onPreUpdate(engine: Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
    // check distance to player
    if (!this.scene) return;

    const player = getPlayer(this.scene);
    const distanceToPlayer = this.pos.distance(player.pos);
    if (this.maxViewDistance > distanceToPlayer) {
      // face player
      this.isPatrolling = false;
      this.direction = this.pos.x < player.pos.x ? 1 : -1;

      // aim at player
      const deltaY = player.pos.y - this.pos.y;
      const deltaX = player.pos.x - this.pos.x;
      this.aimDirection = Math.atan2(deltaY, deltaX * this.direction);

      // shoot at player
      const now = engine.clock.now();
      if (now - this.lastShootTime > this.shootThrottle) {
        this.activeWeapon?.shoot();
        this.lastShootTime = now;
      }
    } else {
      this.isPatrolling = true;
    }
  }

  public onInitialize(engine: Engine) {
    super.onInitialize(engine);
    // TODO: remove this
    (window as any).enemy = this;
  }
}

export default EnemySoldier;

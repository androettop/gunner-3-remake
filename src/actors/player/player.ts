import {
  Actor,
  Animation,
  CollisionType,
  Engine,
  Keys,
  range,
  Vector,
} from "excalibur";
import { playerArmRunSheet, playerRunSheet } from "./resources";

export interface PlayerParams {
  pos: Vector;
}

class Player extends Actor {
  constructor({ pos }: PlayerParams) {
    super({
      pos: pos,
      width: 64,
      height: 64,
    });
  }
  private isOnGround: boolean = true;

  movementConfig = {
    jumpSpeed: 400,
    runSpeed: 150,
  };

  baseRunAnim = Animation.fromSpriteSheet(playerRunSheet, range(1, 10), 50);
  armRunAnim = Animation.fromSpriteSheet(playerArmRunSheet, range(1, 10), 50);

  jump() {
    if (this.isOnGround) {
      this.vel.y = -this.movementConfig.jumpSpeed;
    }
  }

  runLeft() {
    this.vel.x = -this.movementConfig.runSpeed;
    this.graphics.flipHorizontal = true;
    this.graphics.add("default", this.baseRunAnim);
  }

  runRight() {
    this.vel.x = this.movementConfig.runSpeed;
    this.graphics.flipHorizontal = false;
    this.graphics.add("default", this.baseRunAnim);
  }

  stopRunning() {
    this.vel.x = 0;
    this.graphics.add("default", playerRunSheet.getSprite(0, 0));
    this.body;
  }

  playerMovement(engine: Engine) {
    // wasd movement with keys
    if (engine.input.keyboard.isHeld(Keys.D)) {
      this.runRight();
    } else if (engine.input.keyboard.isHeld(Keys.A)) {
      this.runLeft();
    } else {
      this.stopRunning();
    }

    if (engine.input.keyboard.wasPressed(Keys.Space)) {
      this.jump();
    }
  }

  public update(engine: Engine, delta: number) {
    super.update(engine, delta);
    this.playerMovement(engine);
  }

  onInitialize(engine: Engine) {
    super.onInitialize(engine);

    this.graphics.add("default", playerRunSheet.getSprite(0, 0));
    this.graphics.add("arm", playerArmRunSheet.getSprite(0, 0));
    this.on("pointerup", () => {
      alert("yo");
    });
    this.body.collisionType = CollisionType.Active;
    this.body.useGravity = true;
  }
}

export default Player;

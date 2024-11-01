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

  activeGroundCollisions = 0;

  movementConfig = {
    jumpSpeed: 400,
    runSpeed: 150,
  };

  baseRunAnim = Animation.fromSpriteSheet(playerRunSheet, range(0, 7), 50);
  armRunAnim = Animation.fromSpriteSheet(playerArmRunSheet, range(0, 7), 50);

  jump() {
    if (this.activeGroundCollisions > 0) {
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

  onPreUpdate(_engine: Engine, _delta: number): void {
    this.isOnGround = false;
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
    this.on("collisionstart", (e): void => {
      if (e.side === "Bottom") {
        this.activeGroundCollisions++;
      }
    });
    this.on("collisionend", (e): void => {
      if (e.side === "Bottom") {
        this.activeGroundCollisions--;
      }
    });
  }
}

export default Player;

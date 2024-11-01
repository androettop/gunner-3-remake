import {
  Actor,
  Animation,
  CollisionType,
  Engine,
  Keys,
  range,
  Vector,
} from "excalibur";
import { playerRunSheet } from "./resources";
import PlayerArm from "./arm";

export interface PlayerParams {
  pos: Vector;
}

class Player extends Actor {
  private activeGroundCollisions = 0;

  public movementConfig = {
    jumpSpeed: 400,
    runSpeed: 150,
  };

  private baseRunAnim = Animation.fromSpriteSheet(
    playerRunSheet,
    range(0, 7),
    50,
  );

  private playerArm = new PlayerArm();

  constructor({ pos }: PlayerParams) {
    super({
      pos: pos,
      width: 64,
      height: 64,
    });
  }

  private jump() {
    if (this.activeGroundCollisions > 0) {
      this.vel.y = -this.movementConfig.jumpSpeed;
    }
  }

  private runLeft() {
    this.vel.x = -this.movementConfig.runSpeed;
    this.graphics.flipHorizontal = true;
    this.graphics.use(this.baseRunAnim);
    this.playerArm.armDirection = -1;
    this.playerArm.animState = "run";
  }

  private runRight() {
    this.vel.x = this.movementConfig.runSpeed;
    this.graphics.flipHorizontal = false;
    this.graphics.use(this.baseRunAnim);
    this.playerArm.armDirection = 1;
    this.playerArm.animState = "run";
  }

  private stopRunning() {
    this.vel.x = 0;
    this.graphics.use(playerRunSheet.getSprite(0, 0));
    this.body;
    this.playerArm.animState = "idle";
  }

  private playerMovement(engine: Engine) {
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

  public onInitialize(engine: Engine) {
    super.onInitialize(engine);

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

    this.addChild(this.playerArm);
  }
}

export default Player;

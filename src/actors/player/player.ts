import {
  Actor,
  Animation,
  CollisionType,
  Engine,
  Keys,
  range,
  Vector,
} from "excalibur";
import { playerJumpSheet, playerRunSheet } from "./resources";
import PlayerArm from "./arm";

export interface PlayerParams {
  pos: Vector;
}

class Player extends Actor {
  private activeGroundCollisions = 0;

  public jumpSpeed = 400;
  public runSpeed = 150;

  public wantsJump = false;

  public direction: 1 | -1 = 1;
  public isRunning = false;
  public isOnGround = false;

  private runAnimation = Animation.fromSpriteSheet(
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

  private playerInput(engine: Engine) {
    // wasd movement with keys
    if (engine.input.keyboard.isHeld(Keys.D)) {
      this.direction = 1;
      this.isRunning = true;
    } else if (engine.input.keyboard.isHeld(Keys.A)) {
      this.direction = -1;
      this.isRunning = true;
    } else {
      this.isRunning = false;
    }

    // jump
    this.wantsJump = engine.input.keyboard.wasPressed(Keys.Space);
  }

  private updatePlayerState(engine: Engine) {
    this.isOnGround = this.activeGroundCollisions > 0;
    this.playerInput(engine);
  }

  private executePlayerActions() {
    if (this.isRunning) {
      this.vel.x = this.direction * this.runSpeed;
    } else {
      this.vel.x = 0;
    }

    if (this.wantsJump) {
      this.vel.y = -this.jumpSpeed;
    }
  }

  public animatePlayer() {
    if (!this.isOnGround) {
      this.graphics.use(playerJumpSheet.getSprite(0, 0));
    } else if (this.isRunning) {
      this.graphics.use(this.runAnimation);
    } else {
      this.graphics.use(playerRunSheet.getSprite(0, 0));
    }
    this.graphics.flipHorizontal = this.direction < 0;
  }

  public update(engine: Engine, delta: number) {
    super.update(engine, delta);
    // Get the new state for the player
    this.updatePlayerState(engine);

    // Execute the player actions based on the state
    this.executePlayerActions();

    // Animate player
    this.animatePlayer();
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

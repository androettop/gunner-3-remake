import {
  Actor,
  Animation,
  BodyComponent,
  CollisionType,
  Engine,
  range,
  Side,
  vec,
  Vector,
} from "excalibur";
import { playerJumpSheet, playerRunSheet } from "./resources";
import PlayerArm from "./arm";
import { CoyoteComponent } from "../../components/input/coyote";
import { GAME_CONTROLS } from "../../helpers/consts";

export interface PlayerParams {
  pos: Vector;
}

class Player extends Actor {
  public jumpSpeed = 500;
  public runSpeed = 160;

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

  coyote = new CoyoteComponent({
    // allow the player to jump for a short time after walking off a ledge
    jump: {
      time: 70,
      condition: () => this.isOnGround,
    },
  });

  constructor({ pos }: PlayerParams) {
    super({
      pos: pos,
      width: 64,
      height: 64,
    });
    this.addComponent(this.coyote);
  }

  private playerInput(engine: Engine) {
    // wasd movement with keys
    if (
      GAME_CONTROLS.MOVE_RIGHT.some((key) => engine.input.keyboard.isHeld(key))
    ) {
      this.direction = 1;
      this.isRunning = true;
    } else if (
      GAME_CONTROLS.MOVE_LEFT.some((key) => engine.input.keyboard.isHeld(key))
    ) {
      this.direction = -1;
      this.isRunning = true;
    } else {
      this.isRunning = false;
    }

    // jump
    this.wantsJump = GAME_CONTROLS.JUMP.some((key) =>
      engine.input.keyboard.isHeld(key),
    );
  }

  private updatePlayerState(engine: Engine) {
    this.playerInput(engine);
    if (this.vel.y > 0) {
      this.isOnGround = false;
    }
  }

  private executePlayerActions() {
    if (this.isRunning) {
      this.vel.x = this.direction * this.runSpeed;
    } else {
      this.vel.x = 0;
    }

    if (this.wantsJump && (this.isOnGround || this.coyote.allow("jump"))) {
      this.isOnGround = false;
      this.coyote.reset("jump");
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
    this.graphics.offset.x = -2 * this.direction;
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

  onCollisionStart(
    _self: ex.Collider,
    other: ex.Collider,
    side: ex.Side,
    contact: ex.CollisionContact,
  ): void {
    if (contact.isCanceled()) {
      return;
    }

    const otherBody = other.owner.get(BodyComponent);

    if (
      otherBody?.collisionType === CollisionType.Fixed ||
      otherBody?.collisionType === CollisionType.Active
    ) {
      const wasInAir = this.oldVel.y > 0;

      // player landed on the ground
      if (side === Side.Bottom && wasInAir) {
        this.isOnGround = true;
      }
    }
  }

  public onInitialize(engine: Engine) {
    super.onInitialize(engine);

    console.log(this);

    this.body.collisionType = CollisionType.Active;
    this.body.useGravity = true;

    this.collider.useBoxCollider(22, 45, vec(0, 0), vec(-11, -13));

    this.addChild(this.playerArm);
  }
}

export default Player;

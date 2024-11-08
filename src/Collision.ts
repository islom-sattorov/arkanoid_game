import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";
import { Ball } from "./sprites/Ball";
import { CanvasView } from "./view/CanvasView";

export class Collision {
  isCollidingBrick(ball: Ball, brick: Brick): boolean {
    if (
      ball.pos.x < brick.pos.x + brick.width &&
      ball.pos.x + ball.width > brick.pos.x &&
      ball.pos.y < brick.pos.y + brick.height &&
      ball.pos.y + ball.height > brick.pos.y
    ) {
      return true;
    }

    return false;
  }

  // Check ball collision with bricks
  isCollidingBricks(ball: Ball, bricks: Brick[]): boolean {
    let colliding = false;

    bricks.forEach((brick, idx) => {
      if (this.isCollidingBrick(ball, brick)) {
        ball.changeYDirection();

        if (brick.energy === 1) {
          bricks.splice(idx, 1);
        } else {
          brick.energy -= 1;
        }
        colliding = true;
      }
    });

    return colliding;
  }

  checkBallCollision(ball: Ball, paddle: Paddle, view: CanvasView): void {
    // Check ball collision with paddle
    if (
      ball.pos.x + ball.width > paddle.pos.x &&
      ball.pos.x < paddle.pos.x + paddle.width &&
      ball.pos.y + ball.height === paddle.pos.y
    ) {
      ball.changeYDirection();
    }

    // Check ball collision with walls
    // Ball movement X constaints
    if (ball.pos.x > view.canvas.width - ball.width || ball.pos.x < 0) {
      ball.changeXDirection();
    }

    // Ball movement Y constaints
    if (ball.pos.y < 0) {
      ball.changeYDirection();
    }
  }
}

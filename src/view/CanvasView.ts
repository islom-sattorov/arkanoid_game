// Types
import { Brick } from "../sprites/Brick";
import { Ball } from "../sprites/Ball";
import { Paddle } from "../sprites/Paddle";

export class CanvasView {
  canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private scoreDisplay: HTMLObjectElement | null;
  private start: HTMLObjectElement | null;
  private info: HTMLObjectElement | null;

  constructor(canvasIdName: string) {
    this.canvas = document.getElementById(canvasIdName) as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d");
    this.scoreDisplay = document.getElementById("score") as HTMLObjectElement;
    this.start = document.getElementById("start") as HTMLObjectElement;
    this.info = document.getElementById("info") as HTMLObjectElement;
  }

  clear(): void {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  initStartButton(startFunction: (view: CanvasView) => void): void {
    this.start?.addEventListener("click", () => startFunction(this));
  }

  drawScore(score: number): void {
    if (this.scoreDisplay) this.scoreDisplay.innerHTML = String(score);
  }

  drawInfo(text: string): void {
    if (this.info) this.info.innerHTML = text;
  }

  drawSprite(brick: Brick | Paddle | Ball): void {
    if (!brick) return;
    this.context?.drawImage(
      brick.image,
      brick.pos.x,
      brick.pos.y,
      brick.width,
      brick.height,
    );
  }

  drawBricks(bricks: Brick[]): void {
    bricks.forEach((brick) => this.drawSprite(brick));
  }
}

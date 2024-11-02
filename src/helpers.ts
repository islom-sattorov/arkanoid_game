import { Brick } from "./sprites/Brick";
import {
  BRICK_IMAGES,
  BRICK_WIDTH,
  BRICK_HEIGHT,
  BRICK_ENERGY,
  BRICK_PADDING,
  LEVEL,
  STAGE_COLS,
  STAGE_PADDING,
} from "./setup";

export function createBricks(): Brick[] {
  return LEVEL.reduce((prev, current, currentIdx) => {
    const row = Math.floor(currentIdx + 1) / STAGE_COLS;
    const column = currentIdx % STAGE_COLS;

    const x = STAGE_PADDING + column * (BRICK_WIDTH + BRICK_PADDING);
    const y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);

    if (current === 0) return prev;
    return [
      ...prev,
      new Brick(
        BRICK_WIDTH,
        BRICK_HEIGHT,
        { x, y },
        BRICK_ENERGY[current],
        BRICK_IMAGES[current],
      ),
    ];
  }, [] as Brick[]);
}

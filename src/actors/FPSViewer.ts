import { Actor } from "./Actor";
import { Point } from "../types/Point";

export class FPSViewer extends Actor {
  constructor() {
    super({ x: 10, y: 35 });
  }
  // Se pinta un texto con los FPS
  draw(delta: number, ctx: CanvasRenderingContext2D) {
    //Cálculo de FPS
    const fps = (1 / delta).toFixed(0);
    //Indicar fuente y tamaño
    ctx.font = "35px Consolas";
    //Pintar FPS
    ctx.fillStyle = "#000";
    ctx.fillText(`FPS: ${fps}`, this.position.x, this.position.y);
  }
}

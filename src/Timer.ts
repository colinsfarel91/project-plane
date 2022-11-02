import { Actor } from './actors/Actor';

export class Timer extends Actor {
    elapsed: number = 0;
    // Se pinta un texto con los FPS
    draw(delta: number, ctx: CanvasRenderingContext2D) {
        ctx.translate(this.position.x, this.position.y);
        //Cálculo de FPS
        this.elapsed = this.elapsed + delta;
        ctx.font = '35px Consolas';
        //Pintar FPS
        ctx.fillStyle = '#000';
        ctx.fillText(`Time: ${this.elapsed.toFixed(1)}s`, 0, 0);
    }
}

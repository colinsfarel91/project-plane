import { Point } from '../types/Point';

interface IActor {
    position: Point;
    update: (delta: number) => void;
    draw: (delta: number, ctx: CanvasRenderingContext2D) => void;
    keyboardEventDown: (key: string) => void;
    keyboardEventUp: (key: string) => void;
}

export class Actor implements IActor {
    position: Point;
    constructor(position: Point) {
        this.position = position;
    }

    update(delta: number) {}
    draw(delta: number, ctx: CanvasRenderingContext2D) {}
    keyboardEventDown(key: string) {}
    keyboardEventUp(key: string) {}
}

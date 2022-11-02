import { throws } from "assert";
import { Point } from "../types/Point";
import { Size } from "../types/Size";
import { checkLimits } from "../utils/checkLimits";
import { Actor } from "./Actor";

interface PlaneProps {
    initialpos: Point;
    size: Size;
    speed: number;
    color: string;
    image_src: string;
}

export class Plane extends Actor{
    size: Size;
    color: string;
    image: HTMLImageElement;
    initialpos: Point;
    speed: number;

    constructor(props: PlaneProps) {
        super(props.initialpos);
        this.size = props.size;
        this.color = props.color;
        this.image = new Image();
        this.image.src = props.image_src;
        this.initialpos = props.initialpos;
        this.speed = props.speed;

    }

    update(delta: number) {
        this.speed = this.speed + 5;

        const newPos = {
            x: this.position.x + this.speed * delta,
            y: this.position.y + this.speed * delta,
        }

        if(checkLimits(newPos)){
            this.position = newPos;
        }
        else {
            this.speed = 0
        }
    }
    draw(delta: number, ctx: CanvasRenderingContext2D) {
        ctx.translate(this.position.x, this.position.y);
        ctx.fillStyle = "red"
        ctx.fillRect(this.position.x, this.position.y, this.position.x + 10, this.position.y +20)
        ctx.fill();
    }
    keyboardEventDown(key: string) {}
    keyboardEventUp(key: string) {}
}

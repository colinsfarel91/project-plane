import { checkLimits } from '../utils/checkLimits';
import { Size } from '../types/Size';
import { Point } from '../types/Point';
import { Actor } from './Actor';
import { converAngletoRad } from '../utils/converAngleToRad';

const imageSrc = 'src/assets/ferrari.png';

interface InitialCarProperties {
    initialPos: Point;
    size: Size;
    color?: string;
    angleSpeed?: number;
    speed?: number;
}

export class Car extends Actor {
    size: Size;
    color: string;
    angle: number = 0;
    angleSpeed: number;
    speed: number; // in px per second
    acceleration: number = 0;
    initial_pos: Point;
    image: HTMLImageElement;

    constructor(props: InitialCarProperties) {
        super(props.initialPos);
        this.initial_pos = props.initialPos;
        this.size = props.size;
        this.color = props.color || 'blue';
        this.angleSpeed = props.angleSpeed || 0;
        this.speed = typeof props.speed != 'undefined' ? props.speed : 100;
        this.image = new Image();
        this.image.src = imageSrc;
    }

    update(delta: number): void {
        // console.log("CAR DELTA", delta);
        // this.angle += this.angleSpeed;
        // this.angleSpeed *= 0.9;
        //this.carSpeed = this.carSpeed * 0.9 + this.carAcceleration;
        // let newPos: Point = {
        //   x:
        //     this.position.x +
        //     Math.cos(converAngletoRad(this.angle)) * this.carSpeed,
        //   y:
        //     this.position.y +
        //     Math.sin(converAngletoRad(this.angle)) * this.carSpeed,
        // };
        this.angle = this.angle + this.angleSpeed;
        this.speed = (this.speed + this.acceleration) * 0.98;

        const newPos = {
            x: this.position.x + this.speed * delta * Math.cos(converAngletoRad(this.angle)),
            y: this.position.y + this.speed * delta * Math.sin(converAngletoRad(this.angle)),
        };

        // Solo actualizo los datos del coche (posicicion) si el coche está dentro de los limites definidos
        if (checkLimits(newPos)) {
            this.position = newPos;
        } else {
            this.speed = 0;
        }
    }

    draw(delta: number, ctx: CanvasRenderingContext2D): void {
        ctx.translate(this.position.x, this.position.y);

        // CAR DATA
        ctx.font = '35px Consolas';
        //Pintar FPS
        ctx.fillStyle = '#000';
        ctx.fillText(`${this.speed.toFixed(2)} px/seg`, 0, 60);

        ctx.fillStyle = '#000';
        ctx.fillText(`x:${this.position.x.toFixed(0)} y:${this.position.y.toFixed(0)}`, 0, 100);

        ctx.rotate(converAngletoRad(this.angle));

        //Añadir imagen al carro
        ctx.rotate(converAngletoRad(180))
        ctx.drawImage(this.image, -this.size.h / 2, -this.size.w / 2, this.size.h, this.size.w);

        ctx.fill();
    }

    keyboardEventDown(key: string): void {
        switch (key) {
            case 'ArrowRight':
                this.angleSpeed = 2;
                break;
            case 'ArrowLeft':
                this.angleSpeed = -2;
                break;
            case 'ArrowUp':
                this.acceleration = 10;
                break;
            case 'ArrowDown':
                this.acceleration = -10;
                break;
            default:
                //Cualquier otra tecla
                console.log('Not a valid key');
        }
    }

    keyboardEventUp(key: string): void {
        switch (key) {
            case 'ArrowUp':
                this.acceleration = 0;
                break;
            case 'ArrowDown':
                this.acceleration = 0;
                break;
            case 'ArrowRight':
                this.angleSpeed = 0;
                break;
            case 'ArrowLeft':
                this.angleSpeed = 0;
                break;
            default:
                //Cualquier otra tecla
                console.log('Not a valid key');
        }
    }

    restart_car() {
        this.position = this.initial_pos;
        this.angle = 0;
        this.speed = 0;
    }
}

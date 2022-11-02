import { Point } from './../types/Point';
import { converAngletoRad } from '../utils/converAngleToRad';
import { Actor } from './Actor';

export class Pacman extends Actor {
    origin: Point;
    pacmanSize: number;
    mouthOpen: number;
    color: string;
    maxSpeed: number;
    speed: Point;

    //Parámetros posición x, posición y,  color, velocidad(dirección)
    constructor(initialPos: Point, color: string = '#ffd117', maxSpeed: number = 100) {
        super(initialPos);
        this.origin = { x: initialPos.x, y: initialPos.y };
        this.pacmanSize = 30;
        this.mouthOpen = 40;
        this.color = color;
        this.maxSpeed = maxSpeed;
        this.speed = { x: maxSpeed, y: 0 };
    }

    //Dibuja en el canvas
    draw(delta: number, ctx: CanvasRenderingContext2D): void {
        let origin = this.origin;
        let pacmanSize = this.pacmanSize;
        let mouthOpen = this.mouthOpen;
        //Oscilación de la "boca" Open * Delta
        let open = 20 * Math.sin(10 * mouthOpen * delta) + 20;
        //Dirección la "boca"
        let direction = 0;

        //Cambia la dirección en X dependiendo de la velocidad
        if (this.speed.x != 0 && this.speed.x < 0) {
            direction = 180;
        }
        //Indicarle el color
        ctx.fillStyle = this.color;
        //Crear una ruta
        ctx.beginPath();
        //Mover la posición de pintado
        ctx.moveTo(origin.x, origin.y);
        //Crear círculo
        ctx.arc(origin.x, origin.y, pacmanSize, converAngletoRad(-open + direction), converAngletoRad(open + direction), true);
        //Cerrar ruta
        ctx.closePath();
        //Rellena el Pacman con el color
        ctx.fill();
        //Dibujar en el canvas
        ctx.stroke();
    }

    //Mover a diferentes posiciones
    update(delta: number): void {
        this.mouthOpen += 7;
        // Speed * Delta
        let newPosX = this.origin.x + this.speed.x * delta;
        //Definir un límite para el movimiento
        if (newPosX <= 500 - this.pacmanSize && newPosX >= this.pacmanSize) {
            this.origin.x = newPosX;
        }
    }

    //Obtener la tecla presionada y manejar la dirección
    keyboardEventDown(key: string): void {
        switch (key) {
            case 'ArrowRight':
                //Posición y dirección de la cara cambiadas
                console.log('right');
                this.speed.x = this.maxSpeed;
                break;
            case 'ArrowLeft':
                //Posición y dirección de la cara cambiadas
                console.log('left');
                this.speed.x = -this.maxSpeed;
                break;
            case 'ArrowUp':
                //Posición y dirección de la cara cambiadas
                console.log('up');
                //this.speed.x = this.maxSpeed;
                break;
            case 'ArrowDown':
                //Posición y dirección de la cara cambiadas
                console.log('down');
                //this.speed.x = this.maxSpeed;
                break;
            default:
                //Cualquier otra tecla
                console.log('Not a valid key');
        }
    }
}

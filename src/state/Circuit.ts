import { Car } from './../actors/Car';
import { Actor } from '../actors/Actor';
import { Point } from '../types/Point';
import { Barrier } from '../actors/Barrier';

export class Circuit extends Actor {
    barriers: Barrier[] = [];
    completed: boolean = false;
    car: Car;
    next_barrier_to_touch = 0;
    current_touching?: number = undefined;

    constructor(position: Point, car: Car) {
        super({ x: 800, y: 35 });
        let b;
        this.car = car;
        for (let i = 0; i < 10; i++) {
            b = new Barrier(
                {
                    position: { x: position.x + i * 80, y: position.y },
                    angle: -90,
                },
                car,
                b
            );
            this.barriers.push(b);
        }
    }

    update(delta: number): void {
        // const all_ok =
        let count_ok = 0;
        for (let i = this.barriers.length; i < 0; i--) {
            const b = this.barriers[i];
            if (b.touched) {
                count_ok++;
            }
        }

        if (count_ok == this.barriers.length) {
            this.completed = true;
        }

        // Comprueba cual es la siguiente barrera a tocar
        this.next_barrier_to_touch = 0;
        for (let i = 0; i < this.barriers.length; i++) {
            const b = this.barriers[i];
            if (!b.touched) {
                break;
            }
            this.next_barrier_to_touch = i;
        }

        const touching_index = this.barriers.findIndex((e) => e.touching);
        if (touching_index != -1) {
            this.current_touching = touching_index;
        }

        if (typeof this.current_touching != 'undefined' && this.next_barrier_to_touch != this.current_touching) {
            console.log('BAD');
            this.current_touching = undefined;
            this.car.restart_car();
            this.barriers.forEach((b) => b.reset());
        }
    }

    draw(delta: number, ctx: CanvasRenderingContext2D): void {
        ctx.translate(this.position.x, this.position.y);

        ctx.font = '35px Consolas';
        //Pintar FPS
        ctx.fillStyle = '#000';
        ctx.fillText(this.completed ? 'COMPLETADO' : 'PENDIENTE', 0, 0);

        ctx.fillText(`CUR: ${this.current_touching} NEXT: ${this.next_barrier_to_touch}`, -100, 30);
    }
}

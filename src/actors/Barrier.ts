import { Actor } from "./Actor";
import { Car } from "./Car";
import { Point } from "../types/Point";
import { converAngletoRad } from "../utils/converAngleToRad";

interface BarrierProps {
  position: Point;
  angle?: number;
}

export class Barrier extends Actor {
  touched: boolean = false;
  touching: boolean = false;
  car: Car;
  distance?: number;
  barrier_length = 40;
  angle = 0;
  linked_barrier?: Barrier;

  constructor(props: BarrierProps, car: Car, linked_barrier?: Barrier) {
    super(props.position);
    this.car = car;
    this.angle = props.angle || 0;
    this.linked_barrier = linked_barrier;
  }

  update(delta: number): void {
    this.distance = Math.sqrt(
      Math.pow(this.position.x - this.car.position.x, 2) +
        Math.pow(this.position.y - this.car.position.y, 2)
    );
    if (this.distance <= this.barrier_length) {
      if (this.linked_barrier) {
        if (this.linked_barrier.touched) {
          this.touched = true;
        }
      } else {
        this.touched = true;
      }
    }

    if (this.distance <= this.barrier_length) {
      this.touching = true;
    } else {
      this.touching = false;
    }
  }

  // Se pinta un texto con los FPS
  draw(delta: number, ctx: CanvasRenderingContext2D) {
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(converAngletoRad(this.angle));

    ctx.fillStyle = this.touching ? "green" : "red";
    ctx.strokeStyle = this.touching ? "green" : "red";

    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = this.touched ? "green" : "red";
    ctx.strokeStyle = this.touched ? "green" : "red";
    ctx.beginPath();
    ctx.moveTo(-this.barrier_length, 0);
    ctx.lineTo(this.barrier_length, 0);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = "#000";
    ctx.font = "35px Consolas";
    ctx.fillText(`${this.distance?.toFixed(0)}`, 0, 0);
  }

  reset() {
    this.touched = false;
  }
}

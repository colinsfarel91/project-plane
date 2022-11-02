import { Point } from '../types/Point';
import { Actor } from './Actor';

let pacmanMap = `WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
WW............WWW............WW
WW.WWWW.WWWWW.WWW.WWWWW.WWWW.WW
WW*WWWW.WWWWW.WWW.WWWWW.WWWW*WW
WW.WWWW.WWWWW.WWW.WWWWW.WWWW.WW
WW...........................WW
WW.WWWW.WW.WWWWWWWWW.WW.WWWW.WW
WW.WWWW.WW.WWWWWWWWW.WW.WWWW.WW
WW......WW....WWW....WW......WW
WWWWWWW.WWWWW.WWW.WWWWW.WWWWWWW
WWWWWWW.WWWWW.WWW.WWWWW.WWWWWWW
WWWWWWW.WW...........WW.WWWWWWW
WWWWWWW.WW.WWW---WWW.WW.WWWWWWW
WWWWWWW.WW.WoooooooW.WW.WWWWWWW
...........WoooooooW...........
WWWWWWW.WW.WoooooooW.WW.WWWWWWW
WWWWWWW.WW.WWWWWWWWW.WW.WWWWWWW
WWWWWWW.WW...........WW.WWWWWWW
WWWWWWW.WW.WWWWWWWWW.WW.WWWWWWW
WWWWWWW.WW.WWWWWWWWW.WW.WWWWWWW
WW............WWW............WW
WW.WWWW.WWWWW.WWW.WWWWW.WWWW.WW
WW*WWWW.WWWWW.WWW.WWWWW.WWWW*WW
WW...WW.................WW...WW
WWWW.WW.WW.WWWWWWWWW.WW.WW.WWWW
WWWW.WW.WW.WWWWWWWWW.WW.WW.WWWW
WW......WW....WWW....WW......WW
WW.WWWWWWWWWW.WWW.WWWWWWWWWW.WW
WW.WWWWWWWWWW.WWW.WWWWWWWWWW.WW
WW...........................WW
WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW`
    .split('\n')
    .map((e) => e.split(''));

export class Map extends Actor {
    canvasWidth: number;
    canvasHeight: number;
    purple: string;
    black: string;
    green: string;
    white: string;
    constructor(position: Point, ctx: CanvasRenderingContext2D, purple: string, black: string, green: string, white: string) {
        super(position);
        this.canvasWidth = ctx.canvas.width;
        this.canvasHeight = ctx.canvas.height;
        this.purple = purple;
        this.black = black;
        this.green = green;
        this.white = white;
    }

    //Si se borran no pasa nada
    keyboardEventDown() {}
    keyboardEventUp() {}
    update() {}

    draw(delta: number, ctx: CanvasRenderingContext2D) {
        let mapRatio = this.canvasHeight / pacmanMap.length;

        for (let y = 0; y < pacmanMap.length; y++) {
            for (let x = 0; x < pacmanMap[y].length; x++) {
                ctx.beginPath();
                let mapSquare = pacmanMap[y][x];
                switch (mapSquare) {
                    case 'W':
                        ctx.fillStyle = this.purple;
                        ctx.fillRect(x * mapRatio, y * mapRatio, mapRatio, mapRatio);
                        ctx.fill();
                        break;
                    case '.':
                        ctx.fillStyle = this.black;
                        ctx.arc(x * mapRatio + mapRatio / 2, y * mapRatio + mapRatio / 2, 5, 0, 2 * Math.PI);
                        ctx.fill();
                        break;
                    case '*':
                        ctx.fillStyle = this.green;
                        ctx.arc(x * mapRatio + mapRatio / 2, y * mapRatio + mapRatio / 2, 5, 0, 2 * Math.PI);
                        ctx.fill();
                        break;
                    case '-':
                        ctx.fillStyle = this.white;
                        ctx.fillRect(x * mapRatio, y * mapRatio, mapRatio, mapRatio);
                        ctx.fill();
                        break;
                    case 'o':
                        ctx.fillStyle = this.black;
                        ctx.fillRect(x * mapRatio, y * mapRatio, mapRatio, mapRatio);
                        ctx.fill();
                        break;
                }
                ctx.closePath();
            }
        }
    }
}

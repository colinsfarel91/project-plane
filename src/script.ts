import { Car } from './actors/Car';
import { Actor } from './actors/Actor';
import { FPSViewer } from './actors/FPSViewer';
import { Timer } from './Timer';
import { Barrier } from './actors/Barrier';
import { Circuit } from './state/Circuit';
import { Map } from './actors/Map';
// import { Pacman } from './Pacman';

window.onload = () => {
    //Obtetner el canvas
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    //Darle un contexto al canvas
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    //Crear un rectángulo
    // ctx.fillStyle = 'blue';
    // ctx.fillRect(80, 45, 100, 240);

    //Lista de instancias de Pacman's

    const player = new Car({
        initialPos: { x: 500, y: 467 },
        size: { w: 50, h: 100 },
        speed: 0,
    });

    const race = new Circuit({ x: 200, y: 500 }, player);

    const map = new Map({ x: 0, y: 0 }, ctx, 'purple', 'black', 'green', 'white');

    // let actors: Actor[] = [
    //   new FPSViewer(),
    //   new Timer({ x: 400, y: 35 }),
    //   player,
    //   ...race.barriers,
    //   race,
    // ];

    let actors: Actor[] = [map, player];

    //Parte del renderizado
    let lastFrame = 0;
    const render = (time: number) => {
        // Las funciones van a ser dependientes de delta
        let delta = (time - lastFrame) / 1000;
        lastFrame = time;

        //* Pasos:
        // - Por cada Pacman obtengo una nueva posición
        actors.forEach((actor) => actor.update(delta));
        // - Borro todo el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // - Por cada Pacman dibujo la nueva posición, y dirección y movimiento de la boca
        actors.forEach((actor) => {
            ctx.save();
            actor.draw(delta, ctx);
            ctx.restore();
        });
        // Método Recursivo
        window.requestAnimationFrame(render);
    };

    //Permite renderizar
    window.requestAnimationFrame(render);

    //Obtener tecla por medio del DOM
    document.body.addEventListener('keydown', (e) => {
        // - Controla la dirección de todos los Pacman
        actors.forEach((actor) => actor.keyboardEventDown(e.key));
    });
    document.body.addEventListener('keyup', (e) => {
        // - Controla la dirección de todos los Pacman
        actors.forEach((actor) => actor.keyboardEventUp(e.key));
    });
};

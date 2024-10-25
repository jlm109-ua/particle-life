import Universe from './universe.js';
import Particle from './particle.js';

let universe; // The universe in which the particles will move.
const N_PARTICLES = 100; // The number of particles to create
const N_COLORS = 6; // The number of colors to use
const colors = 360 / N_COLORS;

new p5((p) => {
    p.setup = () => {
        universe = new Universe(p, p.windowWidth, p.windowHeight);
        universe.setup();
    };

    p.draw = () => {
        universe.update();
        universe.render();
    };

    p.windowResized = () => {
        universe.resize(p.windowWidth, p.windowHeight); // Ajusta el tamaño del canvas
    };
});

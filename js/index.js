import Universe from './universe.js';
import Particle from './particle.js';

let universe; // The universe in which the particles will move.
const N_PARTICLES = 100; // The number of particles to create
const N_COLORS = 6; // The number of colors to use
const colors = 360 / N_COLORS;
const bgColor = '#111'; // The background color of the canvas

new p5((p) => {
    p.setup = () => {
        universe = new Universe(p, p.windowWidth, p.windowHeight, bgColor);
        universe.setup();
    };

    p.draw = () => {
        universe.update();
        universe.render();
    };

    p.windowResized = () => {
        universe.resize(p.windowWidth, p.windowHeight, bgColor); // Ajusta el tamaño del canvas
    };
});

import Universe from './Universe.js';
import Particle from './Particle.js';

let universe; // The universe in which the particles will move.
const N_PARTICLES = 100; // The number of particles to create
const N_COLORS = 6; // The number of colors to use
const colors = 360 / N_COLORS;
const bgColor = '#111'; // The background color of the canvas

new p5((p) => {
    /**
     * @method setup Sets up the canvas.
     */
    p.setup = () => {
        universe = new Universe(p, p.windowWidth, p.windowHeight, bgColor);
        universe.setup();
    };

    /**
     * @method draw Draws the canvas.
     */
    p.draw = () => {
        universe.update();
        universe.render();
    };

    /**
     * @method windowResized Resizes the canvas when the window is resized.
     */
    p.windowResized = () => {
        universe.resize(p.windowWidth, p.windowHeight, bgColor); // Ajusta el tamaño del canvas
    };
});

import Universe from './Universe.js';
import Particle from './Particle.js';
import Settings from './Settings.js';

let universe; // The universe in which the particles will move.

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

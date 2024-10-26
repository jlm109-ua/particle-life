import Universe from './Universe.js';
import Particle from './Particle.js';
import Settings from './Settings.js';

let universe; // The universe in which the particles will move.
new p5((p) => {
    /**
     * @method setup - Initializes the canvas and the universe.
     */
    p.setup = () => {
        Settings.render();
        universe = new Universe(p, p.windowWidth, p.windowHeight, Settings.bgColor); // Create the universe with window size and background color
        universe.setup(); // Call the setup method of the universe to configure the canvas
    };

    /**
     * @method draw - Runs every frame, updating and rendering the universe.
     */
    p.draw = () => {
        universe.update(); // Update the particles' positions in the universe
        universe.render(); // Render the universe and draw particles on the canvas
    };

    /**
     * @method windowResized - Resizes the canvas when the window size changes.
     */
    p.windowResized = () => {
        universe.resize(p.windowWidth, p.windowHeight); // Adjust the canvas size to the new window dimensions
    };
});

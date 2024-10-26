import Particle from './Particle.js';

/**
 * @class Universe - Represents the universe where particles move.
 */
export default class Universe {
    /**
     * @constructor - Initializes the universe with dimensions and background color.
     * @param {object} p - The p5 instance for drawing on the canvas.
     * @param {number} width - Width of the universe (canvas).
     * @param {number} height - Height of the universe (canvas).
     * @param {string} bgColor - Background color for the canvas.
     */
    constructor(p, width, height, bgColor) {
        this.p = p; // Store the p5 instance
        this.width = width; // Canvas width
        this.height = height; // Canvas height
        this.bgColor = bgColor; // Canvas background color
        this.particles = []; // Array to hold all particles in the universe
    }

    /**
     * @method setup - Sets up the canvas and creates particles.
     */
    setup() {
        this.p.createCanvas(this.width, this.height); // Create the canvas with specified dimensions
        this.p.background(this.bgColor); // Set the background color

        // Generate particles with random colors
        for (let i = 0; i < 100; i++) {
            const color = this.p.color(this.p.random(360), 100, 100); // Generate a random color in HSB mode
            const particle = new Particle(this.p, color); // Create a new particle
            this.particles.push(particle); // Add the particle to the particles array
        }
    }

    /**
     * @method resize - Resizes the canvas when the window is resized.
     * @param {number} newWidth - New width of the canvas.
     * @param {number} newHeight - New height of the canvas.
     */
    resize(newWidth, newHeight) {
        this.width = newWidth; // Update canvas width
        this.height = newHeight; // Update canvas height
        this.p.resizeCanvas(this.width, this.height); // Resize the canvas
        this.p.background(this.bgColor); // Reset the background after resizing
    }

    /**
     * @method update - Updates all particles in the universe.
     */
    update() {
        this.particles.forEach(particle => particle.update()); // Update each particle's position
    }

    /**
     * @method render - Renders the universe and all particles.
     */
    render() {
        this.p.background(this.bgColor); // Clear the canvas with the background color
        this.particles.forEach(particle => particle.draw()); // Draw each particle on the canvas
    }
}

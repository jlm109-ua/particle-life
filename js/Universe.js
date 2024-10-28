import Particle from './Particle.js';
import Settings from './Settings.js';

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
     * @method updateParticles - Updates the particles in the universe.
     */
    updateParticles() {
        this.particles = [];
        for (let i = 0; i < Settings.N_PARTICLES; i++) {
            const colorHue = this.p.random(0, 360); // Color aleatorio en el rango HSB
            const color = this.p.color(colorHue, 100, 100); // Genera el color en HSB
            const particle = new Particle(this.p, color);
            this.particles.push(particle);
        }
    }


    /**
     * @method setup - Sets up the canvas and creates particles.
     */
    setup() {
        this.p.colorMode(this.p.HSB, 360, 100, 100);
        this.p.createCanvas(this.width, this.height); // Create the canvas with specified dimensions
        this.p.background(this.bgColor); // Set the background color
        this.updateParticles(); // Create particles in the universe
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
        // Check if the number of particles has changed
        if (this.particles.length !== Settings.N_PARTICLES) {
            this.updateParticles();
        }

        // Check if the background color has changed
        if (this.bgColor !== Settings.bgColor) {
            this.bgColor = Settings.bgColor;
            this.p.background(this.bgColor);
        }

        // Check if the speed constant has changed (it is set to 1 at default)
        if (Settings.SPEED_CONSTANT !== 1) {
            this.particles.forEach((particle) => {
                particle.update();
            })
        }

        this.particles.forEach((particleA, i) => {
            let totalForces = this.p.createVector(0, 0); // Vector to store the total force acting on the particle

            this.particles.forEach((particleB, j) => {
                if (j === i) return; // Skip the current particle
                const rx = particleB.position.x - particleA.position.x; // Calculate the x distance between the particles
                const ry = particleB.position.y - particleA.position.y; // Calculate the y distance between the particles

                /* Update the velocities */




                /* if (i !== j) {
                    const colorIndexA = Math.floor(this.p.hue(particleA.color) / (360 / Settings.N_COLORS));
                    const colorIndexB = Math.floor(this.p.hue(particleB.color) / (360 / Settings.N_COLORS));

                    const forceMagnitude = Settings.interactionMatrix[colorIndexA][colorIndexB];

                    const distance = this.p.dist(particleA.position.x, particleA.position.y, particleB.position.x, particleB.position.y);
                    if (distance > 0) {
                        const force = this.p.createVector(
                            (particleB.position.x - particleA.position.x) / distance,
                            (particleB.position.y - particleA.position.y) / distance
                        ).mult(forceMagnitude / distance);

                        particleA.velocity.add(force);
                    }
                } */
            });
            particleA.update(); // Update the particle's position based on its velocity
        });
    }


    /**
     * @method render - Renders the universe and all particles.
     */
    render() {
        this.p.background(this.bgColor); // Clear the canvas with the background color
        this.particles.forEach(particle => particle.draw()); // Draw each particle on the canvas
    }
}

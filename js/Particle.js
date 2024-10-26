import Settings from './Settings.js';

/**
 * @class Particle - Represents a single particle in the universe.
 */
export default class Particle {
    /**
     * @constructor - Initializes a particle with random position, velocity, and a given color.
     * @param {object} p - The p5 instance to access p5 methods.
     * @param {string} color - Color of the particle.
     */
    constructor(p, color) {
        this.p = p; // Store the p5 instance for accessing p5 functions
        this.position = this.p.createVector(this.p.random(this.p.width), this.p.random(this.p.height)); // Random starting position within the canvas
        this.velocity = this.p.createVector(this.p.random(-1, 1), this.p.random(-1, 1)); // Random initial velocity
        this.color = color; // Set the particle's color
    }

    /**
     * @method update - Updates the particle's position based on its velocity.
     */
    update() {
        this.position.add(this.velocity); // Move the particle by adding its velocity to its position

        // Make the particle bounce off the edges
        if (this.position.x < 0 || this.position.x > this.p.width) this.velocity.x *= -1;
        if (this.position.y < 0 || this.position.y > this.p.height) this.velocity.y *= -1;
    }

    /**
     * @method draw - Renders the particle as a circle on the canvas.
     */
    draw() {
        this.p.fill(this.color); // Set the particle's fill color
        this.p.noStroke(); // Remove any outline from the particle
        this.p.circle(this.position.x, this.position.y, 5); // Draw the particle as a circle with a radius of 5
    }
}

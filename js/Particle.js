import Settings from './Settings.js';

/**
 * @class Particle: Particles are the basic building blocks of the simulation. They have a position, velocity and type.
 */
export default class Particle {
    /**
     * @constructor Creates a particle with a random position, velocity and a given color (type).
     * @param {*} color 
     */
    constructor(color) {
        this.position = new Vector2D(Math.random() * canvas.width, Math.random() * canvas.height);
        this.velocity = new Vector2D(Math.random(Settings.minSpeed, Settings.maxSpeed), Math.random(Settings.minSpeed, Settings.maxSpeed)); // Random velocity between -1 and 1: x would be between -1 and 1, y would be between -1 and 1
        this.color = color;
    }

    /**
     * @method draw Draws the particle as a circle on the canvas.
     */
    draw() {
        context.fillStyle = colors[this.color];
        context.beginPath();
        context.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI);
        // Draws the circle with: x, y, radius, start angle, end angle
        context.fill();
    }
}
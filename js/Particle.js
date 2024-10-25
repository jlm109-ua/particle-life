/**
 * @class Particle: Particles are the basic building blocks of the simulation. They have a position, velocity and type.
 */
class Particle {
    position = new Vector2D(); // Where the particle is
    velocity = new Vector2D(); // How fast the particle is moving
    color = 0; // What type of particle it is. We will use colors to represent this.

    /**
     * @constructor Creates a particle with a random position, velocity and color (type).
     */
    constructor() {
        this.position = new Vector2D(Math.random() * canvas.width, Math.random() * canvas.height);
        this.velocity = new Vector2D(Math.random() * 2 - 1, Math.random() * 2 - 1);
        this.color = Math.floor(Math.random() * 3);
    }

    /**
     * @constructor Creates a particle with a random position, velocity and a given color (type).
     */
    constructor(color) {
        this.position = new Vector2D(Math.random() * canvas.width, Math.random() * canvas.height);
        this.velocity = new Vector2D(Math.random() * 2 - 1, Math.random() * 2 - 1);
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
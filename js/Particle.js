import Settings from './Settings.js';

/**
 * @class Particle - Represents a single particle in the universe.
 */
export default class Particle {
    /**
     * @constructor - Initializes a particle with random position, velocity, and a given color.
     * @param {object} p - The p5 instance to access p5 methods.
     * @param {object} color - The color of the particle.
     */
    constructor(id, p, color) {
        this.id = id; // Save the particle id for debug purposes
        this.p = p; // Store the p5 instance for accessing p5 functions
        this.p.colorMode(this.p.HSB, 100, 100); // Set the color mode to HSB: Hue, Saturation, Brightness
        this.xSpeed = this.p.random(Settings.minSpeed, Settings.maxSpeed); // Save the x speed
        this.ySpeed = this.p.random(Settings.minSpeed, Settings.maxSpeed); // Save the y speed
        this.maxSpeed = Settings.maxSpeed; // Maximum speed for the particle
        this.position = this.p.createVector(this.p.random(this.p.width), this.p.random(this.p.height)); // Random starting position within the canvas
        this.velocity = this.p.createVector(this.xSpeed, this.ySpeed); // Random initial velocity between minSpeed and maxSpeed
        this.color = this.p.color(color, 100, 100); // Set the particle's color
        // console.log("Particle - Color is: " + this.color.toString());
    }

    /**
     * @method draw - Renders the particle as a circle on the canvas.
     */
    draw() {
        // Debug
        // console.log("Particle - Colors available on Settings.colors are: " + Settings.colors);
        // console.log("Particle - Each color to HSB is: " + Settings.colors.map(color => this.p.color(color).toString()));
        // console.log("Particle - Color is: " + this.color.toString());
        this.p.fill(this.color); // Set the particle's fill color
        this.p.noStroke(); // Remove any outline from the particle
        this.p.circle(this.position.x, this.position.y, 5); // Draw the particle as a circle with a radius of 5

        if (Settings.drawEverything) {
            // For debug we will show the particle id
            this.p.text(this.id, this.position.x - 4, this.position.y - 5);

            // For debug purposes, we draw the direction of the particle with the particle's color
            this.p.stroke(this.color);
            this.p.strokeWeight(1);
            this.p.line(this.position.x, this.position.y, this.position.x + this.velocity.x, this.position.y + this.velocity.y);

            // For debug purposes, we draw the rMax circle around the particle
            this.p.noFill();
            this.p.stroke(255);
            this.p.strokeWeight(1);
            this.p.circle(this.position.x, this.position.y, Settings.rMax);

            // For debug purposes, we draw the beta circle around the particle
            this.p.noFill();
            this.p.stroke(this.color);
            this.p.strokeWeight(1);
            this.p.circle(this.position.x, this.position.y, Settings.beta);
        }
    }
}

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
        for (let id = 0; id < Settings.N_PARTICLES; id++) {
            const randomColor = this.p.random(0, 5).toFixed(0); // Random color index
            console.log("Universe - Random color index is: " + randomColor);
            const colorHue = Settings.colors[randomColor]; // Random color hue
            console.log("Universe - Random color is: " + randomColor);
            const color = this.p.color(colorHue, 100, 100); // Create a color object
            console.log("Universe - Color is: " + color);
            const particle = new Particle(id, this.p, color);
            this.particles.push(particle);
        }
    }

    /**
     * @method setup - Sets up the canvas and creates particles.
     */
    setup() {
        this.p.colorMode(this.p.HSB); // Set the color mode to HSB: Hue, Saturation, Brightness
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
     * @method force - Calculates the force between two particles.
     * @param {*} r Distance between two particles.
     * @param {*} a Interaction matrix value.
     * @returns {Float} The force between two particles.
     */
    force(r, a) {
        if (r < Settings.beta)
            return r / Settings.beta - 1;
        else if (Settings.beta < r && r < 1)
            return a + (1 - Math.abs(2 * r - 1 - Settings.beta) / (1 - Settings.beta));
        else
            return 0;
    }

    getColor(color) {
        switch (color) {
            case color === rgba(255, 255, 255, 1):
                return 0;
            case color === rgba(255, 255, 0, 1):
                return 1;
            case color === rgba(0, 255, 0, 1):
                return 2;
            case color === rgba(255, 0, 255, 1):
                return 3;
            case color === rgba(0, 0, 255, 1):
                return 4;
            case color === rgba(255, 0, 0, 1):
                return 5;
        }
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
        if (Settings.SPEED_CONSTANT !== null | Settings.SPEED_CONSTANT !== NaN) {
            this.particles.forEach((particle) => {
                particle.update();
            })
        }

        this.particles.forEach((particleA, i) => {
            let totalForceX = 0; // Total force in the x direction
            let totalForceY = 0; // Total force in the y direction
            let totalForces = this.p.createVector(totalForceX, totalForceY); // Vector to store the total force acting on the particle

            this.particles.forEach((particleB, j) => {
                if (j === i) return; // Skip the current particle
                console.log("Universe - \tParticle " + particleA.id + " position is: " + particleA.position);
                const rx = particleB.position.x - particleA.position.x; // Calculate the x distance between the particles
                const ry = particleB.position.y - particleA.position.y; // Calculate the y distance between the particles
                const r = Math.hypot(rx, ry); // Calculate the distance between the particles
                console.log("Universe - \tParticle " + particleB.id + " position is: " + particleB.position);
                console.log("Universe - \tDistance between particles " + particleA.id + " and " + particleB.id + " is: " + r);

                console.log("Conditions for interaction: (r > 0) and (r < Settings.rMax) are " + (r > 0) + " and " + (r < Settings.rMax) + " so the interaction is: " + (r > 0 && r < Settings.rMax));
                if (r > 0 && r < Settings.rMax) {
                    const colorA = this.getColor(particleA.color);
                    console.log("Universe - Color A is: " + colorA);
                    const colorB = this.getColor(particleB.color);
                    console.log("Universe - Color B is: " + colorB);
                    const f = this.force(r / Settings.rMax, Settings.interactionMatrix[colorA][colorB]); // Calculate the force between the particles
                    totalForceX += rx / r * f; // Calculate the x component of the force
                    totalForceY += ry / r * f; // Calculate the y component of the force
                    totalForces.add(this.p.createVector(totalForceX, totalForceY)); // Add the force to the total force acting on the particle
                }
            });

            totalForceX *= Settings.rMax * Settings.forceFactor; // Scale the x component of the force
            totalForceY *= Settings.rMax * Settings.forceFactor; // Scale the y component of the force

            particleA.velocity.x *= Settings.frictionFactor; // Apply friction to the x component of the velocity
            particleA.velocity.y *= Settings.frictionFactor; // Apply friction to the y component of the velocity

            particleA.velocity.x += totalForceX * Settings.dt; // Update the x component of the velocity
            particleA.velocity.y += totalForceY * Settings.dt; // Update the y component of the velocity

            particleA.velocity.x *= Settings.SPEED_CONSTANT; // Apply the speed constant to the x component of the velocity
            particleA.velocity.y *= Settings.SPEED_CONSTANT; // Apply the speed constant to the y component of the velocity

            particleA.position.add(particleA.velocity); // Move the particle by adding its velocity to its position

            // The particle space will be a wrap-around space
            if (particleA.position.x < 0) particleA.position.x = this.p.width;
            if (particleA.position.x > this.p.width) particleA.position.x = 0;
            if (particleA.position.y < 0) particleA.position.y = this.p.height;
            if (particleA.position.y > this.p.height) particleA.position.y = 0;

            //particleA.update(); // Update the particle's position based on its velocity
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

import Particle from './Particle.js';
import Settings from './Settings.js';

export default class Universe {
    constructor(p, width, height, bgColor) {
        this.p = p;
        this.width = width;
        this.height = height;
        this.bgColor = bgColor;
        this.particles = [];
        this.previousNParticles = Settings.N_PARTICLES; // Store initial N_PARTICLES value
    }

    /**
     * @method setup - Sets up the canvas and creates particles.
     */
    setup() {
        // // console.log("p5.HSB = " + this.p.HSB);
        this.p.colorMode(this.p.HSB, 100, 100); // Set the color mode to HSB: Hue, Saturation, Brightness
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

    /**
     * @method getColor - Returns the index of the color in the Settings.colors array.
     * @param {object} color - The color to find in the Settings.colors array.
     * @returns {number} The index of the color in the Settings.colors array.
     */
    getColor(color) {
        switch (color) {
            case color.toString() === this.p.color(Settings.colors[0]).toString():
                return 0;
            case color.toString() === this.p.color(Settings.colors[1]).toString():
                return 1;
            case color.toString() === this.p.color(Settings.colors[2]).toString():
                return 2;
            case color.toString() === this.p.color(Settings.colors[3]).toString():
                return 3;
            case color.toString() === this.p.color(Settings.colors[4]).toString():
                return 4;
            default:
                return 5;
        }
    }

    /**
     * @method updateParticles - Updates the particles in the universe only if the particle count has changed.
     */
    updateParticles() {
        if (this.particles.length !== Settings.N_PARTICLES) {
            // console.log(`Updating particles. New count: ${Settings.N_PARTICLES}`);
            this.particles = []; // Reset the particle array

            // Create new particles
            for (let id = 0; id < Settings.N_PARTICLES; id++) {
                const randomColor = Math.floor(Math.random() * Settings.colors.length);
                const colorHue = Settings.colors[randomColor];
                const color = this.p.color(colorHue, 100, 100); // Color in HSB mode
                const particle = new Particle(id, this.p, color);
                this.particles.push(particle);
            }
            // console.log("Particles updated successfully.");
        }
    }

    /**
     * @method update - Updates all particles in the universe based on real-time settings.
     */
    update() {
        if (Settings.pause) {
            // console.log("Simulation paused. Skipping update.");
            return; // Skip updating if the simulation is paused
        }

        // Debug: check and log all variables from Settings
        const settings = Settings.toJSON();
        // console.log("Universe - Current Settings:", settings);

        // Update background color immediately if it has changed
        if (this.bgColor !== Settings.bgColor) {
            // console.log(`Background color changed to: ${Settings.bgColor}`);
            this.bgColor = Settings.bgColor;
            this.p.background(this.bgColor);
        }

        // Update particles if the number of particles has changed
        if (this.previousNParticles !== Settings.N_PARTICLES) {
            // console.log("Particle count changed, updating particles.");
            this.updateParticles();
            this.previousNParticles = Settings.N_PARTICLES;
        }

        // Main update loop for each particle
        this.particles.forEach((particleA, i) => {
            let totalForceX = 0;
            let totalForceY = 0;

            // Calculate forces based on interaction with every other particle
            this.particles.forEach((particleB, j) => {
                if (i === j) return; // Skip self-interaction

                const rx = particleB.position.x - particleA.position.x;
                const ry = particleB.position.y - particleA.position.y;
                const r = Math.hypot(rx, ry); // Calculate distance

                if (r > 0 && r < Settings.rMax) {
                    const colorA = this.getColor(particleA.color);
                    const colorB = this.getColor(particleB.color);
                    const f = this.force(r / Settings.rMax, Settings.interactionMatrix[colorA][colorB]);

                    // Accumulate forces
                    totalForceX += rx / r * f;
                    totalForceY += ry / r * f;
                }
            });

            // Apply force scaling and friction
            totalForceX *= Settings.rMax * Settings.forceFactor;
            totalForceY *= Settings.rMax * Settings.forceFactor;

            // Apply friction factor
            particleA.velocity.x *= Settings.frictionFactor;
            particleA.velocity.y *= Settings.frictionFactor;

            // Adjust velocity with the calculated force and timestep
            particleA.velocity.x += totalForceX * Settings.dt;
            particleA.velocity.y += totalForceY * Settings.dt;

            // Apply speed constant from Settings
            particleA.velocity.x *= Settings.SPEED_CONSTANT;
            particleA.velocity.y *= Settings.SPEED_CONSTANT;

            // Update position with the new velocity
            particleA.position.add(particleA.velocity);

            // Handle wrap-around or bounding box conditions
            if (Settings.wrapAround) {
                // Wrap-around effect when particle exits boundaries
                if (particleA.position.x < 0) particleA.position.x = this.p.width;
                if (particleA.position.x > this.p.width) particleA.position.x = 0;
                if (particleA.position.y < 0) particleA.position.y = this.p.height;
                if (particleA.position.y > this.p.height) particleA.position.y = 0;
            }

            if (Settings.box) {
                // Bounding box effect to keep particles within boundaries
                if (particleA.position.x < 0) {
                    particleA.position.x = 0;
                    particleA.velocity.x *= -1;
                    // console.log(`Particle ${particleA.id} hit left boundary.`);
                }
                if (particleA.position.x > this.p.width) {
                    particleA.position.x = this.p.width;
                    particleA.velocity.x *= -1;
                    // console.log(`Particle ${particleA.id} hit right boundary.`);
                }
                if (particleA.position.y < 0) {
                    particleA.position.y = 0;
                    particleA.velocity.y *= -1;
                    // console.log(`Particle ${particleA.id} hit top boundary.`);
                }
                if (particleA.position.y > this.p.height) {
                    particleA.position.y = this.p.height;
                    particleA.velocity.y *= -1;
                    // console.log(`Particle ${particleA.id} hit bottom boundary.`);
                }
            }
        });
    }

    /**
     * @method render - Renders the universe and all particles.
     */
    render() {
        this.p.background(this.bgColor);
        this.particles.forEach(particle => particle.draw());
    }
}
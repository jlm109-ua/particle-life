/**
 * @class Settings: A class that contains the settings of the simulation.
 */
class Settings {
    // Universe settings
    static N_PARTICLES = 100;

    // Particle settings
    static N_COLORS = 6;
    static colors = 360 / Settings.N_COLORS;
    static minSpeed = -1;
    static maxSpeed = 1;

    // Canvas settings
    static bgColor = '#111';

    /* UNIVERSE SETTERS */

    /**
     * @method setNParticles Sets the number of particles in the simulation.
     * @param {*} nParticles 
     */
    static setNParticles(nParticles) {
        Settings.N_PARTICLES = nParticles;
    }

    /* PARTICLE SETTERS */

    /**
     * @method setNColors Sets the number of colors in the simulation.
     * @param {*} nColors 
     */
    static setNColors(nColors) {
        Settings.N_COLORS = nColors;
        Settings.colors = 360 / Settings.N_COLORS;
    }

    /**
     * @method setMinSpeed Sets the minimum speed of the particles.
     * @param {*} minSpeed 
     */
    static setMinSpeed(minSpeed) {
        Settings.minSpeed = minSpeed;
    }

    /**
     * @method setMaxSpeed Sets the maximum speed of the particles.
     * @param {*} maxSpeed 
     */
    static setMaxSpeed(maxSpeed) {
        Settings.maxSpeed = maxSpeed;
    }

    /* CANVAS SETTERS */

    /**
     * @method setBgColor Sets the background color of the canvas.
     * @param {*} bgColor 
     */
    static setBgColor(bgColor) {
        Settings.bgColor = bgColor;
    }
}
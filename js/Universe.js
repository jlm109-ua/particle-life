/**
 * @class Universe: A class that represents the universe in which the particles will move.
 */
class Universe {
    /**
     * @constructor Creates a universe with a given width and height.
     * @param {*} width 
     * @param {*} height 
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.particles = []; // An array to store the particles, initially empty.
    }

    /**
     * @method setup Sets up the canvas.
     */
    setup(/* add parameters like N_PARTICLES from index to fill the particles array */) {
        createCanvas(this.width, this.height);
        background(0);

        // TODO: Add particles to the universe
    }

    /**
     * @method addParticle Adds the given particle to the universe.
     */
    addParticle(particle) {
        this.particles.push(particle);
    }

    update() {
    }

    render() {
        background(0);
    }
}

export default Universe;

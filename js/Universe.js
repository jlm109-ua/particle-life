/**
 * @class Universe: A class that represents the universe in which the particles will move.
 */
export default class Universe {
    /**
     * @constructor Creates a universe with a given width and height.
     * @param {*} width 
     * @param {*} height 
     */
    constructor(p, width, height) {
        this.p = p;
        this.width = width;
        this.height = height;
        this.particles = [];
    }

    /**
     * @method setup Sets up the canvas.
     */
    setup() {
        this.p.createCanvas(this.width, this.height);
        this.p.background(0);
    }

    /**
     *
     * @param newWidth
     * @param newHeight
     */
    resize(newWidth, newHeight) {
        this.width = newWidth;
        this.height = newHeight;
        this.p.resizeCanvas(this.width, this.height);
        this.p.background(0);
    }

    update() {
    }

    render() {
        this.p.background(0);
    }
}
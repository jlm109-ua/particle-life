/**
 * @class Universe: A class that represents the universe in which the particles will move.
 */
export default class Universe {
    /**
     * @constructor Creates a universe with a given width and height.
     * @param {*} width 
     * @param {*} height 
     */
    constructor(p, width, height, bgColor) {
        this.p = p;
        this.width = width;
        this.height = height;
        this.bgColor = bgColor;
        this.particles = [];
    }

    /**
     * @method setup Sets up the canvas.
     */
    setup() {
        this.p.createCanvas(this.width, this.height);
        this.p.background(this.bgColor);
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
        this.p.background(this.bgColor);
    }

    update() {
    }

    render() {
        this.p.background(this.bgColor);
    }
}
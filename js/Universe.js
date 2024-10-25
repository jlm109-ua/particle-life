/**
 * @class Universe: A class that represents the universe in which the particles will move.
 */
class Universe {
    /**
     * @constructor Creates a universe with a given width and height.
     * @param {*} width 
     * @param {*} height 
     */
    constructor(p, width, height) {
        this.p = p;
        this.width = width;
        this.height = height;
        this.particles = []; // An array to store the particles, initially empty.
    }

    /**
     * @method setup Sets up the canvas.
     */
    setup() {
        this.p.createCanvas(this.width, this.height);
        this.p.background(0);
    }

    resize(newWidth, newHeight) {
        this.width = newWidth;
        this.height = newHeight;
        this.p.resizeCanvas(this.width, this.height); // Redimensiona el canvas
        this.p.background(0); // Restablece el fondo después del cambio de tamaño
    }

    update() {
        // Lógica de actualización de partículas
    }

    render() {
        this.p.background(0); // Fondo oscuro en cada renderizado
        // Renderizado de partículas si es necesario
    }
}

export default Universe;

class Universe {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.particles = [];
    }

    setup() {
        createCanvas(this.width, this.height);
        background(0);
    }

    addParticle(particle) {
        //this.particles.push(particle);
    }

    update() {
    }

    render() {
        background(0);
    }
}

export default Universe;

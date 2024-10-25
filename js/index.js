import Universe from './universe.js';
import Particle from './particle.js';

let universe; // The universe in which the particles will move.
const N_PARTICLES = 100; // The number of particles to create
const N_COLORS = 6; // The number of colors to use
const colors = 360 / N_COLORS;

function setup() {
    universe = new Universe(windowWidth, windowHeight);
    universe.setup();
}

function draw() {
    universe.update();
    universe.render();
}

window.setup = setup;
window.draw = draw;

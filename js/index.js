import Universe from './universe.js';

let universe;

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

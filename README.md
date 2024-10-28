
# Particle Life

The **Particle Life** algorithm simulates the interaction of particles based on predefined rules of attraction and repulsion, resulting in emergent behaviors and complex patterns reminiscent of ecosystems or social groups.

## Overview

In this simulation, particles interact with each other based on their "type." Each type is associated with a color for easy visualization and has unique interaction rules with other types. The simulation’s behavior depends heavily on the force of these interactions and the particles' initial conditions.

## Core Rules

- **Particle Count**: A set number of particles is initialized in the simulation space.
- **Particle Types**: Each particle has an assigned "type," represented by a color for easy identification.
- **Interaction Forces**: Each type has a specific interaction force with other types (including itself), which can be:
  - _Repulsive (negative)_: Particles repel each other, keeping distance.
  - _Attractive (positive)_: Particles attract each other, moving closer over time.

## Pseudoalgorithm

```
// ToDo
// Sorry :p
```

## Installation

To set up this simulation locally, follow these steps:

### Clone the Repository

```bash
git clone https://github.com/your-username/particle-life
cd particle-life
```

### Install Dependencies

Make sure you have the required packages installed (e.g., `p5.js` if using JavaScript).

```bash
npm install
```

### Run the Simulation

```bash
npm start
```

## Configuration

We created a file called [`Settings.js`](https://github.com/jlm109-ua/particle-life/blob/master/js/Settings.js) so you can modify the parameters of the simulation. These settings will show up on the web as collapsible buttons.

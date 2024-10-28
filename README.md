# Particle Life

The **Particle Life** algorithm simulates the interaction of particles based on predefined rules of attraction and repulsion, resulting in emergent behaviors and complex patterns reminiscent of ecosystems or social groups.

## Understanding Particle Life

A particle will have the following properties:

| **Color** | **Position** | **Velocity** |
|-----------|--------------|--------------|
| $c \in ℤ _ m $ | $x \in ℝ ^ D$ | $\dot{x} \in ℝ ^ D$ |
| Integer | Vector | Vector |

Also, a particle will only be **affected by other particles closer than one distance unit**. 

For a pair of particles i and j inside this _one distance unit_ diameter, we calculate the distance (r) between these two particles by:

1. Substracting the coordinates from the vectors: $\overrightarrow{r_{i,j}} = \overrightarrow{x_j} - \overrightarrow{x_i}$
2. Taking the length of the vector: $r_{i,j} = \|\| \overrightarrow{r_{i,j}} \|\|$

Then, we give this distance rᵢⱼ to a force function F() to calculate the force and the direction of this interaction. In order to compute the attraction force, we have an attraction matrix A where we insert how much a color (type) is attracted (or repelled) to each other color (type, again). So, the attraction between these two particles will be: $a_{i,j} = A[c_i][c_j]$, being $[c_i]$ the row of the matrix and $[c_j]$ the column.

Now, having the distance and the attraction, we use $F(r_{i,j}, a_{i,j})$ to calculate the force.

$$
F(r,a) = 
\begin{cases}
    \frac r β - 1 & \quad \text{if} r < β \\
    a * (\frac{1 - \| 2r - 1 - β \|}{1-β)}) & \quad \text{if} β < r < 1 \\
    0 & \quad \text{otherwise}
\end{cases}
$$

We made a graphic so its easily to understand:

| Attraction | Repulsion |
|------------|-----------|
![Force function graphic for attraction.](https://github.com/jlm109-ua/particle-life/blob/master/info/attraction.png) | ![Force function graphic for repulsion.](https://github.com/jlm109-ua/particle-life/blob/master/info/repulsion.png)

## Simulating Particle Life

In this simulation, particles interact with each other based on their "type". Each type is associated with a color for easy visualization and has unique interaction rules with other types. The simulation’s behavior depends heavily on the force of these interactions and the particles' initial conditions.

### Core Rules

- **Particle Count**: A set number of particles is initialized in the simulation space.
- **Particle Types**: Each particle has an assigned "type", represented by a color for easy identification.
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

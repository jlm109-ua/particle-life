# Particle Life

The **Particle Life** algorithm simulates the interaction of particles based on predefined rules of attraction and repulsion, resulting in emergent behaviors and complex patterns reminiscent of ecosystems or social groups.

## Understanding Particle Life

Big thanks to [Tom Mohr](https://www.youtube.com/@tom-mohr) for uploading an [amazing video of Particle Life](https://www.youtube.com/watch?v=scvuli-zcRc). We will follow the method presented on the video for this section.

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
    \frac r \beta - 1 & \quad \text{if } r < \beta \\
    a * (\frac{1 - \| 2r - 1 - \beta \|}{1 - \beta)}) & \quad \text{if } \beta < r < 1 \\
    0 & \quad \text{otherwise}
\end{cases}
$$

We made a graphic so its easily to understand:

| Attraction | Repulsion |
|------------|-----------|
![Force function graphic for attraction.](https://github.com/jlm109-ua/particle-life/blob/master/info/attraction.png) | ![Force function graphic for repulsion.](https://github.com/jlm109-ua/particle-life/blob/master/info/repulsion.png)

$\beta$ is a constant radius that determines the change between attraction and repulsion.

We then multiply the magnitude of the force with a unit vector that points in the direction of the this force. We can do that with: $\frac{\overrightarrow{r_{i,j}}}{r_{i,j}}F(r_{i,j}, a_{i,j})$

In most cases, we won't have only two particles inside the _one distance unit_ diameter, so what we do is add every directional force to the particle we are calculating the force for. The resultant force will now be: $\sum_j\frac{\overrightarrow{r_{i,j}}}{r_{i,j}}F(r_{i,j}, a_{i,j})$.

Assuming all particles have a mass of one, the acceleration of each particle is given by the following equation:

$\ddot{x_i} = \sum_j\frac{\overrightarrow{r_{i,j}}}{r_{i,j}}F(r_{i,j}, a_{i,j})$

We then divide the distance of the particle ($r_{i,j}$) by the maximum radius ($r_{max}$) so the force function has a 0 to 1 range for the distance:

$\ddot{x_i} = r_{max}\sum_j\frac{\overrightarrow{r_{i,j}}}{r_{i,j}}F(\frac{r_{i,j}}{r_{max}}, a_{i,j})$

In order to extract the velocity and the position from the acceleration we can integrate $\ddot{x_i}$.

- For velocity, we do: $\dot{x_i} \leftarrow \dot{x_i} + \ddot{x_i}\bigtriangleup t$
- For position, we do: $x_i \leftarrow x_i + \dot{x_i}\bigtriangleup t$

We will need **friction** in this simulated universe, so we will use a friction constant $\mu$ that is equal to $(\frac{1}{2})^{\frac{\bigtriangleup t}{t_{half}}}$. This tells the simulation after how much time half of the velocity should be lost due to friction. With this implementation we can adjust the value of friction depending on the software frame rate.

We can add this constant calculating the velocity: $\dot{x_i} \leftarrow (\frac{1}{2})^{\frac{\bigtriangleup t}{t_{half}}}\dot{x_i} + \ddot{x_i}\bigtriangleup t$

## Simulating Particle Life

In this simulation, particles interact with each other based on their "type". Each type is associated with a color for easy visualization and has unique interaction rules with other types. The simulation’s behavior depends heavily on the force of these interactions and the particles' initial conditions.

### Core Rules

- **Particle Count**: A set number of particles is initialized in the simulation space.
- **Particle Types**: Each particle has an assigned "type", represented by a color for easy identification.
- **Interaction Forces**: Each type has a specific interaction force with other types (including itself), which can be:
  - _Repulsive (negative)_: Particles repel each other, keeping distance.
  - _Attractive (positive)_: Particles attract each other, moving closer over time.

## Pseudoalgorithm

For the pseudoalgorithm we are following again the method presented on [Tom Mohr](https://www.youtube.com/@tom-mohr)'s [amazing video of Particle Life](https://www.youtube.com/watch?v=scvuli-zcRc).

As he said, we will need the following variables:

| Math. representation | Variable | Description |
|----------------------|----------|-------------|
| $n \in N$ | N_PARTICLES | Number of particles. |
| $m \in N$ | - | Number of colors. |
| $d \in N$ | - | Number of dimensions. |
| $c^i \in Z_M$ | colors | Colors for the simulation. |
| $x^i \in R^D$ | position | Vector of positions for each particle. |
| $\dot{x}^i \in R^D$ | velocity | Vector of velocities for each particle. |
| $A \in [-1,1]^{DxD}$ | - | Attraction matrix. |
| $t_{half} \geq 0$ | - | Friction half time. |
| $\bigtriangleup t$ | - | Time steps. |
| $r_{max}$ | - | Maximum radius. |

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

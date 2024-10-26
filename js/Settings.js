/**
 * @class Settings: A class that contains the settings of the simulation.
 */
export default class Settings {
    // Universe settings
    static N_PARTICLES = 100;

    // Particle settings
    static N_COLORS = 6;
    //static colors = 360 / Settings.N_COLORS;
    static colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    static N_COLORS = this.colors.length;
    static minSpeed = -1;
    static maxSpeed = 1;
    static interactionMatrix = Array.from(
        { length: Settings.N_COLORS },
        () => Array(Settings.N_COLORS).fill(Math.random(-1, 1))
    );

    // Canvas settings
    static bgColor = '#111111';

    /* UNIVERSE SETTERS */

    /**
     * @method setNParticles Sets the number of particles in the simulation.
     * @param {*} nParticles 
     */
    static setNParticles(nParticles) {
        Settings.N_PARTICLES = nParticles;
    }

    /* PARTICLE SETTERS */

    /**
     * @method setMinSpeed Sets the minimum speed of the particles.
     * @param {*} minSpeed 
     */
    static setMinSpeed(minSpeed) {
        Settings.minSpeed = minSpeed;
    }

    /**
     * @method setMaxSpeed Sets the maximum speed of the particles.
     * @param {*} maxSpeed 
     */
    static setMaxSpeed(maxSpeed) {
        Settings.maxSpeed = maxSpeed;
    }

    /* CANVAS SETTERS */

    /**
     * @method setBgColor Sets the background color of the canvas.
     * @param {*} bgColor 
     */
    static setBgColor(bgColor) {
        Settings.bgColor = bgColor;
    }

    static setInteraction(colorA, colorB, force) {
        Settings.interactionMatrix[colorA][colorB] = force;
        Settings.interactionMatrix[colorB][colorA] = force;
    }

    /* METHODS */
    /** 
     * @method render - Renders the settings window on the canvas as a web component.
     */
    static render() {
        const settingsDiv = document.createElement("div");
        settingsDiv.id = "settings-menu";
        settingsDiv.style = `
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            border-radius: 8px;
            width: 300px;
            font-family: Arial, sans-serif;
            z-index: 10;
            display: none; /* Initially hidden for dropdown */
        `;

        // Dropdown toggle button
        const toggleButton = document.createElement("button");
        toggleButton.textContent = "Settings";
        toggleButton.style = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(50, 50, 50, 0.9);
            color: white;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-family: Arial, sans-serif;
            z-index: 11;
        `;
        toggleButton.onclick = () => {
            settingsDiv.style.display = settingsDiv.style.display === "none" ? "block" : "none";
        };

        settingsDiv.innerHTML = `
            <h3>Settings</h3>
            <label>Particles: 
                <input type="number" id="nParticles" value="${Settings.N_PARTICLES}" min="1">
            </label>
            <label>Colors:
                <div id="colors">
                    ${Settings.colors.map((color, i) => `<div style="background-color: ${color}; width: 20px; height: 20px; display: inline-block; margin-right: 5px;"></div>`).join("")}
                </div>
            </label>
            <div id="interactionSettings">
                <h4>Interactions</h4>
            </div>
            <label>Min Speed: 
                <input type="number" id="minSpeed" step="0.1" value="${Settings.minSpeed}">
            </label>
            <label>Max Speed: 
                <input type="number" id="maxSpeed" step="0.1" value="${Settings.maxSpeed}">
            </label>
            <label>Background Color: 
                <input type="color" id="bgColor" value="${Settings.bgColor}">
            </label>
        `;

        // Append toggle button and settingsDiv to the body
        document.body.appendChild(toggleButton);
        document.body.appendChild(settingsDiv);

        for (let i = 0; i < Settings.N_COLORS; i++) {
            for (let j = i + 1; j < Settings.N_COLORS; j++) {
                const interactionDiv = document.createElement("div");
                interactionDiv.innerHTML = `
                    <span style="display: inline-block; width: 20px; height: 20px; background-color: ${Settings.colors[i]};"></span>
                    -
                    <span style="display: inline-block; width: 20px; height: 20px; background-color: ${Settings.colors[j]};"></span>
                    <input type="range" min="-5" max="5" step="0.1" value="0" 
                           data-colorA="${i}" data-colorB="${j}"
                           oninput="this.nextElementSibling.textContent = this.value">
                    <span>0</span> <!-- Mostrará el valor actual del rango -->
                `;
                settingsDiv.querySelector("#interactionSettings").appendChild(interactionDiv);
            }
        }

        settingsDiv.querySelectorAll("input[type='range']").forEach((slider) => {
            slider.addEventListener("input", (e) => {
                const colorA = parseInt(e.target.getAttribute("data-colorA"), 10);
                const colorB = parseInt(e.target.getAttribute("data-colorB"), 10);
                const force = parseFloat(e.target.value);
                Settings.setInteraction(colorA, colorB, force);
            });
        });

        // Attach event listeners for real-time settings updates
        document.getElementById("nParticles").addEventListener("input", (e) => {
            Settings.setNParticles(parseInt(e.target.value, 10));
        });
        document.getElementById("minSpeed").addEventListener("input", (e) => {
            Settings.setMinSpeed(parseFloat(e.target.value));
        });
        document.getElementById("maxSpeed").addEventListener("input", (e) => {
            Settings.setMaxSpeed(parseFloat(e.target.value));
        });
        document.getElementById("bgColor").addEventListener("input", (e) => {
            Settings.setBgColor(e.target.value);
        });
    }
}

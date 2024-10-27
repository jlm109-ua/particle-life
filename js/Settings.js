/**
 * @class Settings: A class that contains the settings of the simulation.
 */
export default class Settings {
    // Universe settings
    static N_PARTICLES = 100;

    // Particle settings
    static colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    static N_COLORS = this.colors.length;
    static minSpeed = -1;
    static maxSpeed = 1;
    static interactionMatrix = Array.from(
        { length: Settings.N_COLORS },
        () => Array(Settings.N_COLORS).fill(Math.random(-5, 5))
    );

    // Canvas settings
    static bgColor = '#111111';

    /* UNIVERSE SETTERS */
    static setNParticles(nParticles) { Settings.N_PARTICLES = nParticles; }
    static setMinSpeed(minSpeed) { Settings.minSpeed = minSpeed; }
    static setMaxSpeed(maxSpeed) { Settings.maxSpeed = maxSpeed; }
    static setBgColor(bgColor) { Settings.bgColor = bgColor; }
    static setInteraction(colorA, colorB, force) {
        Settings.interactionMatrix[colorA][colorB] = force;
        Settings.interactionMatrix[colorB][colorA] = force;
    }

    /* METHODS */
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
            display: none; /* Initially hidden for collapsible */
        `;

        // Header with collapsible icon
        const header = document.createElement("div");
        header.style = `
            display: flex;
            align-items: center;
            cursor: pointer;
            font-size: 18px;
            color: white;
        `;
        const arrowIcon = document.createElement("span");
        arrowIcon.textContent = "▼";
        arrowIcon.style = `margin-right: 8px; transition: transform 0.3s ease;`;
        header.appendChild(arrowIcon);
        header.appendChild(document.createTextNode("Settings"));

        header.onclick = () => {
            const isVisible = settingsDiv.style.display === "block";
            settingsDiv.style.display = isVisible ? "none" : "block";
            arrowIcon.textContent = isVisible ? "▼" : "▲";
        };

        // Settings inner content
        settingsDiv.innerHTML = `
            <label>Particles: 
                <input type="number" id="nParticles" value="${Settings.N_PARTICLES}" min="1">
            </label>
            <label>Colors:
                <div id="colors">
                    ${Settings.colors.map((color) => `<div style="background-color: ${color}; width: 20px; height: 20px; display: inline-block; margin-right: 5px;"></div>`).join("")}
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

        // Append interaction sliders
        for (let i = 0; i < Settings.N_COLORS; i++) {
            for (let j = i + 1; j < Settings.N_COLORS; j++) {
                const interactionDiv = document.createElement("div");
                interactionDiv.innerHTML = `
                    <span style="display: inline-block; width: 20px; height: 20px; background-color: ${Settings.colors[i]};"></span>
                    -
                    <span style="display: inline-block; width: 20px; height: 20px; background-color: ${Settings.colors[j]};"></span>
                    <input type="range" min="-5" max="5" step="0.1" value="${Settings.interactionMatrix[i][j]}" 
                           data-colorA="${i}" data-colorB="${j}" 
                           oninput="this.nextElementSibling.textContent = this.value">
                    <span>0</span>
                `;
                settingsDiv.querySelector("#interactionSettings").appendChild(interactionDiv);
            }
        }

        // Event listeners for settings changes
        settingsDiv.querySelectorAll("input[type='range']").forEach((slider) => {
            slider.addEventListener("input", (e) => {
                const colorA = parseInt(e.target.getAttribute("data-colorA"), 10);
                const colorB = parseInt(e.target.getAttribute("data-colorB"), 10);
                const force = parseFloat(e.target.value);
                Settings.setInteraction(colorA, colorB, force);
            });
        });
        document.getElementById("nParticles").addEventListener("input", (e) => Settings.setNParticles(parseInt(e.target.value, 10)));
        document.getElementById("minSpeed").addEventListener("input", (e) => Settings.setMinSpeed(parseFloat(e.target.value)));
        document.getElementById("maxSpeed").addEventListener("input", (e) => Settings.setMaxSpeed(parseFloat(e.target.value)));
        document.getElementById("bgColor").addEventListener("input", (e) => Settings.setBgColor(e.target.value));

        // Append to body
        document.body.appendChild(header);
        document.body.appendChild(settingsDiv);
    }
}

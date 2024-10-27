export default class Settings {
    // Universe settings
    static N_PARTICLES = 100;

    // Particle settings
    static colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    static N_COLORS = this.colors.length;
    static minSpeed = -1;
    static maxSpeed = 1;
    static SPEED_CONSTANT = 1;
    static interactionMatrix = Array.from(
        { length: Settings.N_COLORS },
        () => Array(Settings.N_COLORS).fill(0)
    );

    // Canvas settings
    static bgColor = '#111111';

    /* UNIVERSE SETTERS */
    static setNParticles(nParticles) { Settings.N_PARTICLES = nParticles; }
    static setMinSpeed(minSpeed) { Settings.minSpeed = minSpeed; }
    static setMaxSpeed(maxSpeed) { Settings.maxSpeed = maxSpeed; }
    static setSpeedConstant(speedConstant) { Settings.SPEED_CONSTANT = speedConstant; }
    static setBgColor(bgColor) { Settings.bgColor = bgColor; }
    static setInteraction(colorA, colorB, force) {
        Settings.interactionMatrix[colorA][colorB] = force;
    }

    /* METHODS */
    static render() {
        // Settings button
        const settingsDiv = document.createElement("div");
        settingsDiv.id = "settings-menu";
        settingsDiv.style = `
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            border-radius: 8px;
            width: 250px;
            font-family: Arial, sans-serif;
            font-size: 12px;
            z-index: 10;
            display: none;
            margin-top: 4px;
        `;

        // "Settings" button to toggle menu visibility
        const settingsButton = document.createElement("div");
        settingsButton.style = `
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 5px 10px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border-radius: 5px;
            font-size: 12px;
            font-family: Arial, sans-serif;
            cursor: pointer;
            z-index: 20;
        `;
        settingsButton.textContent = "Settings ▼";

        // Toggle settings button visibility on click
        let isSettingsButtonVisible = false;
        settingsButton.onclick = () => {
            isSettingsButtonVisible = !isSettingsButtonVisible;
            settingsDiv.style.display = isSettingsButtonVisible ? "block" : "none";
            settingsButton.textContent = isSettingsButtonVisible ? "Settings ▲" : "Settings ▼";
        };

        // Settings inner content
        settingsDiv.innerHTML = `
            <h4>Colors
                <div id="colors" style="margin-top: 4px">
                    ${Settings.colors.map((color) => `<div style="background-color: ${color}; width: 20px; height: 20px; display: inline-block; margin-right: 5px;"></div>`).join("")}
                </div>
            </h4>
            <h4>Particles:
                <input type="number" id="nParticles" value="${Settings.N_PARTICLES}" min="0" style="width: 50%">
            </h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-top: 4px;">
                <h4>
                    Speed:
                    <input type="number" id="speedConstant" step="0.01" value=${Settings.SPEED_CONSTANT}" style="width: 100%">
                </h4>
                <h4>
                    Min Speed:
                    <input type="number" id="minSpeed" step="0.01" value="${Settings.minSpeed}" style="width: 100%;">
                </h4>
                <h4>
                    Max Speed: 
                    <input type="number" id="maxSpeed" step="0.01" value="${Settings.maxSpeed}" style="width: 100%;">
                </h4>
            </div>
            <h4 style="margin-top: 4px">Background Color: 
                <input type="color" id="bgColor" value="${Settings.bgColor}" style="width: 50%; height: 12px">
            </h4>
        `;

        // Interactions button
        const interactionsDiv = document.createElement("div");

        interactionsDiv.id = "interactions-menu";
        interactionsDiv.style = `
            position: absolute;
            top: 10px;
            right: 250px;
            padding: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            border-radius: 8px;
            width: 500px;
            font-family: Arial, sans-serif;
            font-size: 12px;
            z-index: 10;
            display: none;
            margin-top: 4px;
        `;

        // "Interactions" button to toggle interactions sliders visibility
        const interactionsButton = document.createElement("div");
        interactionsButton.style = `
            position: absolute;
            top: 10px;
            right: 250px;
            padding: 5px 10px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border-radius: 5px;
            font-size: 12px;
            font-family: Arial, sans-serif;
            cursor: pointer;
            z-index: 20;
        `;
        interactionsButton.textContent = "Interactions ▼"

        // Toggle interactions button visibility on click
        let isInteractionsButtonVisible = false;
        interactionsButton.onclick = () => {
            isInteractionsButtonVisible = !isInteractionsButtonVisible;
            interactionsDiv.style.display = isInteractionsButtonVisible ? "block" : "none";
            interactionsButton.textContent = isInteractionsButtonVisible ? "Interactions ▲" : "Interactions ▼";
        };

        // Interactions inner content
        interactionsDiv.innerHTML = `
    <div id="interactionSettings" style="margin-top: 4px">
        <h4>Interactions</h4>
        <div id="interactionColumns" style="display: flex; flex-wrap: wrap;">
            <div class="column" style="flex: 1; padding: 10px;"></div>
            <div class="column" style="flex: 1; padding: 10px;"></div>
        </div>
    </div>
`;

        // Selecciona el elemento interactionColumns
        const interactionColumns = interactionsDiv.querySelectorAll("#interactionColumns .column");

        // Append interaction sliders
        for (let i = 0; i < Settings.N_COLORS; i++) {
            for (let j = 0; j < Settings.N_COLORS; j++) {
                const interactionDiv = document.createElement("div");
                interactionDiv.innerHTML = `
            <span style="display: inline-block; width: 10px; height: 10px; background-color: ${Settings.colors[i]};"></span>
            to
            <span style="display: inline-block; width: 10px; height: 10px; background-color: ${Settings.colors[j]};"></span>
            <input type="range" min="-1" max="1" step="0.01" value="0" style="width: 60%;"
                data-colorA="${i}" data-colorB="${j}"
                oninput="this.nextElementSibling.textContent = this.value">
            <span class="range-value">${Settings.interactionMatrix[i][j].toFixed(2)}</span>
        `;
                // Alterna entre las dos columnas
                interactionColumns[(i + j) % 2].appendChild(interactionDiv);
            }
        }

        // Append settings button to body
        document.body.appendChild(settingsButton);
        document.body.appendChild(settingsDiv);

        // Append interactions button and content to body
        document.body.appendChild(interactionsButton);
        document.body.appendChild(interactionsDiv);

        // Event listeners for settings changes
        settingsDiv.querySelectorAll("input[type='range']").forEach((slider) => {
            slider.addEventListener("input", (e) => {
                const colorA = parseInt(e.target.getAttribute("data-colorA"), 10);
                const colorB = parseInt(e.target.getAttribute("data-colorB"), 10);
                const force = parseFloat(e.target.value);

                const spanValue = e.target.nextElementSibling;
                spanValue.textContent = force.toFixed(2);

                Settings.setInteraction(colorA, colorB, force);
                console.log("Settings changed - Settings.interactionMatrix[" + colorA + "][" + colorB + "] = " + force);
            });
        });
        document.getElementById("nParticles").addEventListener("input", (e) => {
            Settings.setNParticles(parseInt(e.target.value, 10));
            console.log("Settings changed - Settings.N_PARTICLES = " + Settings.N_PARTICLES);
        });
        document.getElementById("speedConstant").addEventListener("input", (e) => {
            Settings.setSpeedConstant(parseFloat(e.target.value));
            console.log("Settings changed - Settings.SPEED_CONSTANT = " + Settings.SPEED_CONSTANT);
        });
        document.getElementById("minSpeed").addEventListener("input", (e) => {
            Settings.setMinSpeed(parseFloat(e.target.value));
            console.log("Settings changed - Settings.minSpeed = " + Settings.minSpeed);
        });
        document.getElementById("maxSpeed").addEventListener("input", (e) => {
            Settings.setMaxSpeed(parseFloat(e.target.value));
            console.log("Settings changed - Settings.maxSpeed = " + Settings.maxSpeed);
        });
        document.getElementById("bgColor").addEventListener("input", (e) => {
            Settings.setBgColor(e.target.value);
            console.log("Settings changed - Settings.bgColor = " + Settings.bgColor);
        });
    }
}
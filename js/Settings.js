export default class Settings {
    // Particle settings
    static colors = [
        0, // Red
        60, // Yellow
        120, // Green
        180, // Cyan
        240, // Blue
        300 // Magenta
    ]; // Colors in HSB
    static N_COLORS = this.colors.length; // Number of colors
    static minSpeed = -1; // Minimum speed a particle can have
    static maxSpeed = 1; // Maximum speed a particle can have
    static SPEED_CONSTANT = 0.07; // Speed constant for all particles

    // Universe settings
    static N_PARTICLES = 0; // Number of particles
    static dt = 0.06; // Time step
    static rMax = 10; // Maximum interaction radius
    static interactionMatrix = Array.from( // Interaction matrix
        { length: Settings.N_COLORS },
        // Initialized to 0. Uncomment and comment the next line to initialize to 0
        // () => Array(Settings.N_COLORS).fill(0)
        // Initialized to random values between -1 and 1 with 2 decimal places
        () => Array(Settings.N_COLORS).fill(0).map(() => parseFloat((Math.random() * 2 - 1).toFixed(2)))
    );
    static frictionHalfLife = 0.040; // Friction half-life
    static frictionFactor = Math.pow(0.5, Settings.dt / Settings.frictionHalfLife); // Friction factor
    static beta = 0.3; // Beta value for the force function
    static forceFactor = 10; // Force factor for the force function
    static wrapAround = true; // Wrap around space
    static box = false; // Box space
    static pause = false; // Pause the simulation
    static drawEverything = false; // Draw everything

    // Canvas settings
    static bgColor = '#111111';

    /* UNIVERSE SETTERS */
    static setNParticles(nParticles) { Settings.N_PARTICLES = nParticles; }
    static setDt(dt) { Settings.dt = dt; }
    static setRMax(rMax) { Settings.rMax = rMax; }
    static setInteractionMatrix(interactionMatrix) { Settings.interactionMatrix = interactionMatrix; }
    static setInteraction(colorA, colorB, force) { // Set interaction force between two colors, not the whole matrix
        Settings.interactionMatrix[colorA][colorB] = force;
    }
    static setFrictionHalfLife(frictionHalfLife) { Settings.frictionHalfLife = frictionHalfLife; }
    static setFrictionFactor(frictionFactor) { Settings.frictionFactor = frictionFactor; }
    static setBeta(beta) { Settings.beta = beta; }
    static setForceFactor(forceFactor) { Settings.forceFactor = forceFactor; }
    static setWrapAround(wrapAround) { Settings.wrapAround = wrapAround; }
    static setBox(box) { Settings.box = box; }
    static setPause(pause) { Settings.pause = pause; }
    static setDrawEverything(drawEverything) { Settings.drawEverything = drawEverything; }

    /* PARTICLE SETTERS */
    static setMinSpeed(minSpeed) { Settings.minSpeed = minSpeed; }
    static setMaxSpeed(maxSpeed) { Settings.maxSpeed = maxSpeed; }
    static setSpeedConstant(speedConstant) { Settings.SPEED_CONSTANT = speedConstant; }

    /* CANVAS SETTERS */
    static setBgColor(bgColor) { Settings.bgColor = bgColor; }

    /* METHODS */
    static render() {
        // Settings button
        const settingsDiv = document.createElement("div");
        settingsDiv.id = "settings-menu";
        settingsDiv.style = `
            position: absolute;
            top: 40px;
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
            <h4 style="margin-top: 4px; display: flex; justify-content: space-between;">
                Background Color: 
                <input type="color" id="bgColor" value="${Settings.bgColor}" style="width: 50%; height: 12px;">
            </h4>
            <h4 style="text-align: center;">Colors
                <div id="colors" style="display: grid; grid-template-columns: ${Settings.colors.map(() => "1fr").join(" ")}; gap: 5px; margin-top: 2px;">
                    ${Settings.colors.map((color) => `<div style="background-color: hsl(${color}, 100%, 50%); width: 100%; height: 20px; display: inline-block; margin-right: 5px;"></div>`).join("")}
                </div>
            </h4>
            <h4 style="margin-top: 4px; display: flex; justify-content: space-between;">
                Particles:
                <input type="number" id="nParticles" value="${Settings.N_PARTICLES}" min="0" style="width: 50%;">
            </h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-top: 4px;">
                <h4 style="text-align: center;">
                    Speed
                    <input type="number" id="speedConstant" step="0.01" value="${Settings.SPEED_CONSTANT}" style="width: 100%;">
                </h4>
                <h4 style="text-align: center;">
                    Min Speed
                    <input type="number" id="minSpeed" step="0.01" value="${Settings.minSpeed}" style="width: 100%;">
                </h4>
                <h4 style="text-align: center;">
                    Max Speed 
                    <input type="number" id="maxSpeed" step="0.01" value="${Settings.maxSpeed}" style="width: 100%;">
                </h4>
            </div>
            <h4 style="margin-top: 4px; display: flex; justify-content: space-between;">
                Time Step:
                <input type="number" id="dt" value="${Settings.dt}" step="0.01" style="width: 50%;">
            </h4>
            <h4 style="margin-top: 4px; display: flex; justify-content: space-between;">
                Interaction Radius:
                <input type="number" id="rMax" value="${Settings.rMax}" step="1" style="width: 50%;">
            </h4>
            <h4 style="margin-top: 4px; display: flex; justify-content: space-between;">
                Friction Half-Life:
                <input type="number" id="frictionHalfLife" value="${Settings.frictionHalfLife}" step="0.01" style="width: 50%;">
            </h4>
            <h4 style="margin-top: 4px; display: flex; justify-content: space-between;">
                Friction Factor:
                <input type="number" id="frictionFactor" value="${Settings.frictionFactor}" step="0.01" style="width: 50%;">
            </h4>
            <h4 style="margin-top: 4px; display: flex; justify-content: space-between;">
                Beta:
                <input type="number" id="beta" value="${Settings.beta}" step="0.01" style="width: 50%;">
            </h4>
            <h4 style="margin-top: 4px; display: flex; justify-content: space-between;">
                Force Factor:
                <input type="number" id="forceFactor" value="${Settings.forceFactor}" step="0.01" style="width: 50%;">
            </h4>
            <h4 style="margin-top: 4px; text-align: center;">Space
            </h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 4px; text-align: center;">
                <h4>
                    <input type="checkbox" id="wrapAround" ${Settings.wrapAround ? "checked" : ""}>
                    Wrap Around
                </h4>
                <h4>
                    <input type="checkbox" id="box" ${Settings.box ? "checked" : ""}>
                    Box
                </h4>
            </div>
            <h4 style="margin-top: 4px; text-align: center;">Draw Options
            </h4>
            <h4>
                <input type="checkbox" id="drawEverything" ${Settings.drawEverything ? "checked" : ""}>
                DEBUG
            </h4>
            <h4>
                <input type="checkbox" id="pause" ${Settings.pause ? "checked" : ""}>
                Pause
            </h4>
        `;

        // Matrix button
        const matrixButton = document.createElement("div");
        matrixButton.style = `
            position: absolute;
            top: 10px;
            right: 270px;
            padding: 5px 10px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border-radius: 5px;
            font-size: 12px;
            font-family: Arial, sans-serif;
            cursor: pointer;
            z-index: 20;
        `;
        matrixButton.textContent = "Interaction Matrix ▼";

        // Matrix div (the table container)
        const matrixDiv = document.createElement("div");
        matrixDiv.id = "matrix-menu";
        matrixDiv.style = `
            position: absolute;
            top: 40px;
            right: 270px;
            padding: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            border-radius: 8px;
            width: 400px;
            font-family: Arial, sans-serif;
            font-size: 12px;
            z-index: 10;
            display: none;
            margin-top: 4px;
        `;

        // Toggle matrix button visibility on click
        let isMatrixButtonVisible = false;
        matrixButton.onclick = () => {
            isMatrixButtonVisible = !isMatrixButtonVisible;
            matrixDiv.style.display = isMatrixButtonVisible ? "block" : "none";
            matrixButton.textContent = isMatrixButtonVisible ? "Interaction Matrix ▲" : "Interaction Matrix ▼";
        };

        // Create matrix table
        let matrixTable = `<table style="width: 100%; text-align: center; border-collapse: collapse;">`;

        // Header row
        matrixTable += `<tr><th></th>${Settings.colors.map(color => `<th style="color: hsl(${color}, 100%, 50%);">C${color}</th>`).join('')}</tr>`;

        // Table content
        for (let i = 0; i < Settings.N_COLORS; i++) {
            matrixTable += `<tr><th style="color: hsl(${Settings.colors[i]}, 100%, 50%);">C${Settings.colors[i]}</th>`;
            for (let j = 0; j < Settings.N_COLORS; j++) {
                matrixTable += `
            <td>
                <input type="number" value="${Settings.interactionMatrix[i][j]}" step="0.01" min="-1" max="1"
                    style="width: 100%; background-color: rgba(255, 255, 255, 0.1); color: white; text-align: center;"
                    data-colorA="${i}" data-colorB="${j}">
            </td>
        `;
            }
            matrixTable += `</tr>`;
        }
        matrixTable += `</table>`;
        matrixDiv.innerHTML = matrixTable;

        // Event listener for each cell input
        matrixDiv.querySelectorAll("input[type='number']").forEach((input) => {
            input.addEventListener("input", (e) => {
                const colorA = parseInt(e.target.getAttribute("data-colorA"), 10);
                const colorB = parseInt(e.target.getAttribute("data-colorB"), 10);
                const value = parseFloat(e.target.value);
                Settings.setInteraction(colorA, colorB, value);
                // console.log("Settings changed - Settings.interactionMatrix[" + colorA + "][" + colorB + "] = " + value);
            });
        });

        // Append settings button to body
        document.body.appendChild(settingsButton);
        document.body.appendChild(settingsDiv);

        // Append matrix button and table to body
        document.body.appendChild(matrixButton);
        document.body.appendChild(matrixDiv);

        // QuerySelectors for the checkboxes
        const wrapAroundCheckbox = settingsDiv.querySelector("#wrapAround");
        const boxCheckbox = settingsDiv.querySelector("#box");

        // Event listener for wrapAround checkbox
        wrapAroundCheckbox.addEventListener("change", () => {
            Settings.setBox(!wrapAroundCheckbox.checked);
            boxCheckbox.checked = !wrapAroundCheckbox.checked;
        });

        // Event listener for box checkbox
        boxCheckbox.addEventListener("change", () => {
            Settings.setWrapAround(!boxCheckbox.checked);
            wrapAroundCheckbox.checked = !boxCheckbox.checked;
        });

        // Event listeners for settings changes
        settingsDiv.querySelectorAll("input[type='range']").forEach((slider) => {
            slider.addEventListener("input", (e) => {
                const colorA = parseInt(e.target.getAttribute("data-colorA"), 10);
                const colorB = parseInt(e.target.getAttribute("data-colorB"), 10);
                const force = parseFloat(e.target.value);

                const spanValue = e.target.nextElementSibling;
                spanValue.textContent = force.toFixed(2);

                Settings.setInteraction(colorA, colorB, force);
                // console.log("Settings changed - Settings.interactionMatrix[" + colorA + "][" + colorB + "] = " + force);
            });
        });
        document.getElementById("nParticles").addEventListener("input", (e) => {
            Settings.setNParticles(parseInt(e.target.value, 10));
            // console.log("Settings changed - Settings.N_PARTICLES = " + Settings.N_PARTICLES);
        });
        document.getElementById("speedConstant").addEventListener("input", (e) => {
            Settings.setSpeedConstant(parseFloat(e.target.value));
            // console.log("Settings changed - Settings.SPEED_CONSTANT = " + Settings.SPEED_CONSTANT);
        });
        document.getElementById("minSpeed").addEventListener("input", (e) => {
            Settings.setMinSpeed(parseFloat(e.target.value));
            // console.log("Settings changed - Settings.minSpeed = " + Settings.minSpeed);
        });
        document.getElementById("maxSpeed").addEventListener("input", (e) => {
            Settings.setMaxSpeed(parseFloat(e.target.value));
            // console.log("Settings changed - Settings.maxSpeed = " + Settings.maxSpeed);
        });
        document.getElementById("bgColor").addEventListener("input", (e) => {
            Settings.setBgColor(e.target.value);
            // console.log("Settings changed - Settings.bgColor = " + Settings.bgColor);
        });
        document.getElementById("dt").addEventListener("input", (e) => {
            Settings.setDt(parseFloat(e.target.value));
            // console.log("Settings changed - Settings.dt = " + Settings.dt);
        });
        document.getElementById("rMax").addEventListener("input", (e) => {
            Settings.setRMax(parseFloat(e.target.value));
            // console.log("Settings changed - Settings.rMax = " + Settings.rMax);
        });
        document.getElementById("frictionHalfLife").addEventListener("input", (e) => {
            Settings.setFrictionHalfLife(parseFloat(e.target.value));
            // console.log("Settings changed - Settings.frictionHalfLife = " + Settings.frictionHalfLife);
        });
        document.getElementById("frictionFactor").addEventListener("input", (e) => {
            Settings.setFrictionFactor(parseFloat(e.target.value));
            // console.log("Settings changed - Settings.frictionFactor = " + Settings.frictionFactor);
        });
        document.getElementById("beta").addEventListener("input", (e) => {
            Settings.setBeta(parseFloat(e.target.value));
            // console.log("Settings changed - Settings.beta = " + Settings.beta);
        });
        document.getElementById("forceFactor").addEventListener("input", (e) => {
            Settings.setForceFactor(parseFloat(e.target.value));
            // console.log("Settings changed - Settings.forceFactor = " + Settings.forceFactor);
        });
        document.getElementById("wrapAround").addEventListener("input", (e) => {
            Settings.setWrapAround(e.target.checked);
            Settings.setBox(!e.target.checked);
            // console.log("Settings changed - Settings.wrapAround = " + Settings.wrapAround);
            // console.log("Settings changed - Settings.box = " + Settings.box);
        });
        document.getElementById("box").addEventListener("input", (e) => {
            Settings.setBox(e.target.checked);
            Settings.setWrapAround(!e.target.checked);
            // console.log("Settings changed - Settings.box = " + Settings.box);
        });
        document.getElementById("drawEverything").addEventListener("input", (e) => {
            Settings.setDrawEverything(e.target.checked);
            // console.log("Settings changed - Settings.drawEverything = " + Settings.drawEverything);
        });
        document.getElementById("pause").addEventListener("input", (e) => {
            Settings.setPause(e.target.checked);
            // console.log("Settings changed - Settings.pause = " + Settings.pause);
        });
    }
}
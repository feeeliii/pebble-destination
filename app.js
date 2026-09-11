const queryInput = document.getElementById("query");
const searchButton = document.getElementById("search");
const resultsList = document.getElementById("results");
const selectedElement = document.getElementById("selected");
let selectedDestination = null;

searchButton.addEventListener("click", async () => {
    const query = queryInput.value.trim();

    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5&lang=de`;
    const response = await fetch(url)
    const data = await response.json();

    resultsList.innerHTML = "";
    for (const feature of data.features) {
        const [lon, lat] = feature.geometry.coordinates;
        const name = feature.properties.name;

        const item = document.createElement("li");
        item.textContent = `${name} (${lat}, ${lon})`;

        item.addEventListener("click", () => {
            selectedDestination = { lat, lon, name };
            selectedElement.textContent = `Ziel: ${name} (${lat}, ${lon})`;
        });
        resultsList.appendChild(item);
    }

})


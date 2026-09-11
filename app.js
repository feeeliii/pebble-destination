const queryInput = document.getElementById("query");
const searchButton = document.getElementById("search");
const resultsList = document.getElementById("results");
const selectedElement = document.getElementById("selected");

let selectedDestination = null;

function buildGeocodeUrl(query) {
    return `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5&lang=de`;
}

function toPlace(feature) { // GeoJSON-Reihenfolge umgedrehen
    const [lon, lat] = feature.geometry.coordinates;
    return { lat, lon, name: feature.properties.name };
}

async function searchPlaces(query) { 
    const response = await fetch(buildGeocodeUrl(query));;
    const data = await response.json;
    return data.features.map(toPlace);
}

function selectPlace(place) {
    selectedDestination = place;
    selectedElement.textContent = `Ziel: ${place.name} (${place.lat}, ${place.lon})`;
}

function renderPlaces(places) {
    resultsList.innerHTML = "";

    for (const place of places) {
        const item = document.createElement("li");
        item.textContent = `${place.name} (${place.lat}, ${place.lon})`;
        item.addEventListener("click", () => selectPlace(place));
        resultsList.appendChild(item);
    }
}

searchButton.addEventListener("click", async () => {
    const query = queryInput.value.trim();
    const places = await searchPlaces(query);
    renderPlaces(places);
});

/*searchButton.addEventListener("click", async () => {
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

})*/


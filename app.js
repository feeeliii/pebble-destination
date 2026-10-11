import { searchPlaces, formatPlace } from "./geocode.js";
import { createMap, showPlaces } from "./map.js";

const queryInput = document.getElementById("query");
const searchButton = document.getElementById("search");
const resultsList = document.getElementById("results");
const selectedElement = document.getElementById("selected");

const map = createMap("map");

let selectedDestination = null;


function selectPlace(place) {
    selectedDestination = place;
    selectedElement.textContent = `Ziel: ${formatPlace(place)} (${place.lat}, ${place.lon})`;
}

function renderPlaces(places) {
    resultsList.innerHTML = "";

    for (const place of places) {
        const item = document.createElement("li");
        item.textContent = formatPlace(place);
        item.addEventListener("click", () => selectPlace(place));
        resultsList.appendChild(item);
    }
}

searchButton.addEventListener("click", async () => {
    const query = queryInput.value.trim();
    if (query === "") return;

    const places = await searchPlaces(query);
    renderPlaces(places);
    showPlaces(map, places, selectPlace);
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


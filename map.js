import { formatPlace } from "./geocode.js";


export function createMap(elementId) {
    const map = L.map(elementId).setView([51.16, 10.45], 6);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    return map;
}

let markerLayer = null;

export function showPlaces(map, places, onSelect) {
    if (markerLayer) markerLayer.remove();
    if (places.length === 0) return;

    markerLayer = L.featureGroup();
    for (const place of places) {
        L.marker([place.lat, place.lon])
            .bindTooltip(formatPlace(place))
            .on("click", () => onSelect(place))
            .addTo(markerLayer);
    }
    markerLayer.addTo(map);

    map.fitBounds(markerLayer.getBounds(), { maxZoom: 15, padding: [20, 20] });
}


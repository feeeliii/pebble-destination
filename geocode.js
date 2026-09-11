export function buildGeocodeUrl(query) {
    return `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5&lang=de`;
}

export function toPlace(feature) {
    const [lon, lat] = feature.geometry.coordinates;
    return { lat, lon, name: feature.properties.name };
}

export async function searchPlaces(query) {
    const response = await fetch(buildGeocodeUrl(query));
    const data = await response.json();
    return data.features.map(toPlace);
}
export function buildGeocodeUrl(query) {
    return `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5&lang=de`;
}

function placeName(properties) {
    const { name, street, housenumber } = properties;

    if (name) return name;
    if (street && housenumber) return `${street} ${housenumber}`;
    return "Unbenannter Ort";
}

export function toPlace(feature) {
    const [lon, lat] = feature.geometry.coordinates;
    const name = placeName(feature.properties);
    return { lat, lon, name };
}

export async function searchPlaces(query) {
    const response = await fetch(buildGeocodeUrl(query));
    const data = await response.json();
    return data.features.map(toPlace);
}
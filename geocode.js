export function buildGeocodeUrl(query) {
    return `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5&lang=de`;
}

function placeName(properties) {
    const { name, street, housenumber } = properties;

    if (name) return name;
    if (street && housenumber) return `${street} ${housenumber}`;
    if (street) return street;
    return "Unbenannter Ort";
}

export function toPlace(feature) {
    const [lon, lat] = feature.geometry.coordinates;
    const name = placeName(feature.properties);
    const postcode = feature.properties.postcode;
    const city = feature.properties.city;
    return { lat, lon, name, postcode, city };
}

export async function searchPlaces(query) {
    const response = await fetch(buildGeocodeUrl(query));
    const data = await response.json();
    return data.features.map(toPlace);
}
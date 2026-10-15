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

export async function searchPlaces(query, fetchFn = fetch) { //heißt, dass wenn beim aufruf nichts zweiteres weitergegeben wird, wird echtes fetch mitgegeben
    const response = await fetchFn(buildGeocodeUrl(query));
    if (!response.ok) {
        throw new Error(`Photon antwortete mit Status ${response.status}`);
    }
    const data = await response.json();
    return data.features.map(toPlace);
}

export function formatPlace(place) {
    const { name, postcode, city } = place;
    if (postcode && city) return `${name}, ${postcode} ${city}`;
    if (city) return `${name}, ${city}`;
    return name;

}
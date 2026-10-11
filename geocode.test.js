import { test } from "node:test";
import assert from "node:assert";
import { buildGeocodeUrl, toPlace } from "./geocode.js";

test("encodes spaces and umlauts in the query", () => {
    const url = buildGeocodeUrl("Berliner Straße");
    assert.ok(url.includes("q=Berliner%20Stra%C3%9Fe"));
});

test("toPlace swaps GeoJSON [lon, lat] into named lat and lon", () => {
    const feature = {
        geometry: { coordinates: [13.405, 52.52] },
        properties: { name: "Berlin" },
    };
    const place = toPlace(feature);
    assert.strictEqual(place.lat, 52.52);
    assert.strictEqual(place.lon, 13.405);
});

test("toPlace uses fallback name when properties.name is missing", () => {
    const feature = {
        geometry: { coordinates: [13.401, 52.529] },
        properties: { }
    };
    const place = toPlace(feature);
    assert.strictEqual(place.name, "Unbenannter Ort");
})


test("toPlace builds the name from street and housenumber when name is missing", () => {
    const feature = {
        geometry: { coordinates: [13.401, 52.529] },
        properties: { street: "Torstraße", housenumber: "1" },
    };
    const place = toPlace(feature);
    assert.strictEqual(place.name, "Torstraße 1");
});

test("toPlace uses the street alone when housenumber is missing", () => {
    const feature = {
        geometry: { coordinates: [13.401, 52.529] },
        properties: { street: "Torstraße" },
    };
    const place = toPlace(feature);
    assert.strictEqual(place.name, "Torstraße");
});

test("toPlace keeps city and postcode from properties", () => {
    const feature = {
        geometry: { coordinates: [13.4139, 52.5275] },
        properties: { street: "Torstraße", housenumber: "10", city: "Berlin", postcode: "10119" },
    };
    const place = toPlace(feature);
    assert.strictEqual(place.city, "Berlin");
    assert.strictEqual(place.postcode, "10119");
});
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
    assert.deepStrictEqual(place, { lat: 52.52, lon: 13.405, name: "Berlin" });
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
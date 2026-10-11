import { test } from "node:test";
import assert from "node:assert";
import { buildGeocodeUrl } from "./geocode.js";

test("encodes spaces and umlauts in the query", () => {
    const url = buildGeocodeUrl("Berliner Straße");
    assert.ok(url.includes("q=Berliner%20Stra%C3%9Fe"));
});
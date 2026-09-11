const queryInput = document.getElementById("query");
const searchButton = document.getElementById("search");

searchButton.addEventListener("click", async () => {
    const query = queryInput.value.trim();

    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5&lang=de`;
    const response = await fetch (url)
    const data = await response.json();
    
    console.log(data)

    const [lon, lat] = data.features[0].geometry.coordinates;
    console.log("lat:", lat, "lon:", lon);
})


const queryInput = document.getElementById("query");
const searchButton = document.getElementById("search");

searchButton.addEventListener("click", () => {
    const query = queryInput.value.trim();
    console.log("Suche nach:", query)
})
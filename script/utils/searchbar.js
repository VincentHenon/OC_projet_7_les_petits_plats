const searchBar = document.getElementById("search_input");
const magnifyGlass = document.querySelector(".magnifyGlass_bg");
const xMarkEl = document.querySelector(".input_Xmark");

// listen to the magnify icon's click
magnifyGlass.addEventListener("click", () => {
    launchSearch();
})

// listen to Enter and Escape keys
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        launchSearch();
    }
    if (e.key === "Escape") {
        e.preventDefault();
        emptySearch();
    }
})

// listen to the xMark's searchBar's click
xMarkEl.addEventListener("click", () => {
    emptySearch();
})

// listen to the input change. at 3 letters show a xmark
document.addEventListener("input",() => {
    if (searchBar.value.length !== 0) {
        xMarkEl.classList.add("XmarkShow");
    }
    else {
        xMarkEl.classList.remove("XmarkShow");
    }
})

function launchSearch() {
    // filter the recipes
    if (searchBar.value.length >=3) {
        filteredRecipes = getFilteredRecipes();
        // render cards again.
        displayGallery(filteredRecipes);
    }
    else {
        searchBar.value = "";
        searchBar.placeholder = "veuillez entrer 3 caractères minimum...";
        xMarkEl.classList.remove("XmarkShow");
    }
}

function emptySearch() {
    searchBar.placeholder = "Recherchez une recette";
    searchBar.value = "";
    xMarkEl.classList.remove("XmarkShow");
    filteredRecipes = getFilteredRecipes();
    // render cards again.
    displayGallery(filteredRecipes);
}
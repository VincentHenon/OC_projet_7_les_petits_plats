const searchBar = document.getElementById("search_input");
const magnifyGlass = document.querySelector(".magnifyGlass_bg");
const xMarkEl = document.querySelector(".input_Xmark");

function checkSearchBar() {
    searchBar.addEventListener("input", () => {
        // if user click on the search button
        magnifyGlass.addEventListener("click", () => {
            launchSearch();
        })
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

        if (searchBar.value.length !== 0) {
            xMarkEl.classList.add("XmarkShow");
            xMarkEl.addEventListener("click", () => {
                emptySearch();
            })
        }
        else {
            xMarkEl.classList.remove("XmarkShow");
            filteredRecipes = getFilteredRecipes();
        }
    })
    return filteredRecipes;
}

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
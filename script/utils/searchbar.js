const searchBar = document.getElementById("search_input");
const magnifyGlass = document.querySelector(".magnifyGlass_bg");
const xMarkEl = document.querySelector(".input_Xmark");

function checkSearchBar() {
    searchBar.addEventListener("input", () => {
        // if user click on the search button
        magnifyGlass.addEventListener("click", () => {
            filteredRecipes = getFilteredRecipes();
            // render cards again.
            displayGallery(filteredRecipes);
        })

        if (searchBar.value.length !== 0) {
            xMarkEl.classList.add("XmarkShow");
            xMarkEl.addEventListener("click", () => {
                xMarkEl.classList.remove("XmarkShow");
                searchBar.value = "";
                filteredRecipes = getFilteredRecipes();
                // render cards again.
                displayGallery(filteredRecipes);
            })
        }
        else {
            xMarkEl.classList.remove("XmarkShow");
        }
    })
    return filteredRecipes;
}
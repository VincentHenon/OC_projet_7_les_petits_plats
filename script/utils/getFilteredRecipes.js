// METHOD FOR()

function getFilteredRecipes() {

    console.log("tagList is ⬇︎");
    console.log(tagList);
    let tempFilteredRecipes = [];
    filteredRecipes = allRecipes;

    for (let i = 0; i < filteredRecipes.length; i++) {
        const { name, description, ingredients } = filteredRecipes[i];
        
        const includedInName = 
          name.toLowerCase().includes(searchBar.value.toLowerCase());
        
        const includedInDescription = 
          description.toLowerCase().includes(searchBar.value.toLowerCase());
        
        const includedInIngredients = ingredients.some(({ ingredient }) =>
          ingredient.toLowerCase().includes(searchBar.value.toLowerCase())
        );
        
        if (includedInName || includedInDescription || includedInIngredients) {
          tempFilteredRecipes.push(filteredRecipes[i]);
          filteredRecipes = tempFilteredRecipes;
        }
      }
    
    

    filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchBar.value.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchBar.value.toLowerCase()) ||
        recipe.name.includes(searchBar.value.toLowerCase()))
    )
    console.log("filtered recipes by search ⬇︎");
    console.log(filteredRecipes);

    if (tagList.length !== 0) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            tagList.every(tag =>
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag) ||
                recipe.appliance.toLowerCase().includes(tag) ||
                recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag))
                )
            )
        )
        console.log("filtered recipes by tag ⬇︎");
        console.log(filteredRecipes);
    }
    // relaunch the whole process.
    filter(filteredRecipes);
    recipesCounter() // create the recipes' counter
    return filteredRecipes;
}


// METHOD FILTER()
/*function getFilteredRecipes() {

    console.log("tagList is ⬇︎");
    console.log(tagList);
    filteredRecipes = allRecipes;

    filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchBar.value.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchBar.value.toLowerCase()) ||
        recipe.name.includes(searchBar.value.toLowerCase()))
    )
    console.log("filtered recipes by search ⬇︎");
    console.log(filteredRecipes);

    if (tagList.length !== 0) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            tagList.every(tag =>
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag) ||
                recipe.appliance.toLowerCase().includes(tag) ||
                recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag))
                )
            )
        )
        console.log("filtered recipes by tag ⬇︎");
        console.log(filteredRecipes);
    }
    // relaunch the whole process.
    filter(filteredRecipes);
    recipesCounter() // create the recipes' counter
    return filteredRecipes;
}*/
let ingredientFilter = [];
let applianceFilter = [];
let utensilFilter = [];

let allRecipes = [];
let filteredRecipes = [];

let ingredientList = [];
let utensilList = [];
let applianceList = [];

//let allFilters = [ ingredientFilter, applianceFilter, utensilFilter ];

init();

// get the list of the recipes
async function getRecipes() {
  try {
    const response = await fetch('./data/recipes.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function init() {
  const recipes = await getRecipes(); // get recipes
  allRecipes = recipes.recipes;
  filteredRecipes = allRecipes;

  ingredientList = getIngredientList(filteredRecipes); // complete ingredient list
  utensilList = getUtensilList(filteredRecipes);  // complete utensil list
  applianceList = getApplianceList(filteredRecipes);  // complete appliance list

  displayGallery(allRecipes);
}
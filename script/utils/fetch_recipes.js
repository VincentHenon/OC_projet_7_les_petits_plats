let allRecipes = [];
let filteredRecipes = [];

let ingredientList = [];
let utensilList = [];
let applianceList = [];

let ingredientNewList = [];
let utensilNewList = [];
let applianceNewList = [];

let tagList = [];
let searchValue = "";


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

  filter();
  displayGallery(allRecipes);
  recipesCounter(filteredRecipes);
}

function filter() {
  getIngredientList();
  getApplianceList();
  getUtensilList();
  checkSearchBar();
}
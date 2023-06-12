// getting all lists from the recipes
function getIngredientList(filteredRecipes) {

  // ingredientList = []; //clear previous List

  const ingredientBtn = document.querySelector(".btn_ingredients");
  const ingredientMenu = ingredientBtn.querySelector(".result_list");

  const ingredientSet = new Set();

  filteredRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const ingredientName = ingredient.ingredient.toLowerCase();
      ingredientSet.add(ingredientName);
    });
  });

  // store the list found.
  ingredientList = Array.from(ingredientSet);  

  // display the initial list once only.
  displayMenu(ingredientList, ingredientMenu); 
  
  // create a new empty array.
  let ingredientNewList = [];

  // check the events.
  ingredientNewList = checkUserInteractions(ingredientList,ingredientMenu,ingredientBtn,ingredientNewList); 

  return ingredientNewList;
}

function getApplianceList(filteredRecipes) {
  //applianceList = [];
  const applianceBtn = document.querySelector(".btn_appareils");
  const applianceMenu = applianceBtn.querySelector(".result_list");

  const applianceSet = new Set();

  filteredRecipes.forEach((recipe) => {
    const applianceName = recipe.appliance.toLowerCase();
    applianceSet.add(applianceName);
  });

  // store the list found.
  applianceList = Array.from(applianceSet);

  // display the initial list once only.
  displayMenu(applianceList, applianceMenu);
  
  // create a new empty array.
  let applianceNewList = [];
  
  // check the events.
  applianceNewList = checkUserInteractions(applianceList, applianceMenu, applianceBtn, applianceNewList);

  return applianceNewList;
}

function getUtensilList(filteredRecipes) {
  const utensilBtn = document.querySelector(".btn_utensils");
  const utensilMenu = utensilBtn.querySelector(".result_list");

  const utensilSet = new Set();

  filteredRecipes.forEach((recipe) => {
    recipe.ustensils.forEach((utensil) => {
      utensilSet.add(utensil.toLowerCase());
    });
  });

  // store the list found.
  utensilList = Array.from(utensilSet);

  // display the initial list once only.
  displayMenu(utensilList, utensilMenu);

  // create a new empty array.
  let utensilNewList = [];

  // check the events.
  utensilNewList = checkUserInteractions(utensilList, utensilMenu, utensilBtn, utensilNewList);

  return utensilNewList;
}


// all functions to handle the filters and to display the tags.
function checkUserInteractions(list, menu, btn, newList) {
  newList = checkListClick(list, menu, btn, newList);
  newList = checkInputField(list, menu, btn, newList);
  return newList;
}

function checkListClick(list, menu, btn, newList) {
  const menuEl = menu.getElementsByTagName("li");

  // read through all <li> tags found
  [...menuEl].forEach((li) => {
    // liten to them
    li.addEventListener("click", () => {
      // get the text from the HTML element.
      let selectedItem = li.textContent;

      // filter the list by finding the clicked item
      newList = list.filter(
        (item) => item.toLowerCase() === selectedItem.toLowerCase()
      );

      // update the HTML and create the TAG.
      updateDisplay(newList, menu, btn);
      createTag(newList, menu, btn, list);
    });
  });
  return newList;
}

function getFilteredRecipes(newList) {
    // check inside all recipes if newList occurs.
    filteredRecipes = allRecipes.filter(recipe =>
        // find matching items within ingredients, ustensils, appliance and store them
        recipe.ingredients.some(item => item.ingredient.toLowerCase().includes(newList)) 
        || recipe.appliance.toLowerCase().includes(newList) 
        || recipe.ustensils.some(item => item.toLowerCase().includes(newList))
    );
    
    return filteredRecipes;
}

function checkInputField(list, menu, btn, newList) {
  const inputEl = btn.querySelector(".input_dropdown");

  // listen to the input's dropdown
  inputEl.addEventListener("input", () => {
    const inputValue = inputEl.value.toLowerCase();
    // at least two letters to launch the search.
    if (inputValue.length >= 2) {
      
      // find matching item in the list
      newList = list.filter((item) => item.toLowerCase().includes(inputValue));

      // update the results and 
      updateDisplay(newList, menu, btn); // display again the menu
      checkListClick(newList, menu, btn); // check if ingredient is clicked in the menu
      // }
    } else {
      // in case where nothing typed initialize list and render it
      newList = list;
      updateDisplay(newList, menu, btn);
    }
  });
  return newList;
}

function displayMenu(list, menu) {

    // clear the current menu.
    menu.innerHTML = "";
    // render the menu
    let listEl = list.map((item) => `<li>${item}</li>`).join(""); 
    menu.innerHTML = listEl;
  }

function updateDisplay(newList, menu) {
  // clear the current menu.
  menu.innerHTML = "";

  if (newList.length !== 0) {
    // if list is not empty then we build the menu
    const listEl = newList.map((item) => `<li>${item}</li>`).join("");
    menu.innerHTML = listEl;
  } else {
    // else there is no result
    const noResult = `<p class="noResult">Aucun résultat</p>`;
    menu.innerHTML = noResult;
  }
}

function createTag(newList, menu, btn, list) {
  
  const tagName = menu.querySelector("li").textContent;
  const tagWrapper = document.querySelector(".filters_tags_wrapper");
  //tagWrapper.innerHTML = "";

  // render the filter tag.
  const tagEl = document.createElement("div");
  tagEl.classList.add("filters_tag");
  tagEl.innerHTML = `
        <p class="tag_content">${tagName}</p>
        <img class="tag_xmark" src="./assets/icons/xMark.svg" alt="icone d'une croix" />`;
  tagWrapper.appendChild(tagEl);

  const listEl = `<div class="selected_list"><li class="selected_item">${newList[0]}</li><img class="selected_xmark" src="./assets/icons/filledXmark.svg" alt="icone d'une croix" /></div>`;
  menu.innerHTML = listEl;

  const tag_Xmark = document.querySelectorAll(".tag_xmark");
  const selectedItem_Xmark = document.querySelectorAll(".selected_xmark");

  // update the filtered recipes variable
  filteredRecipes = getFilteredRecipes(newList);
  console.log(filteredRecipes);

  //RENDER CARDS AGAIN WITH UNFILTEREDRECIPES;
  displayGallery(filteredRecipes);

  // relaunch the whole process.
  getIngredientList(filteredRecipes);
  getApplianceList(filteredRecipes);
  getUtensilList(filteredRecipes);

  // listen to the event.
  selectedItem_Xmark.forEach((xMark) => { 
    xMark.addEventListener("click", (e) => {
        removeFilter(newList,tagWrapper, tagEl, list)
    })
  })
  // listen to the event.
  tag_Xmark.forEach((xMark) => { 
    xMark.addEventListener("click", (e) => {
    removeFilter(newList, tagWrapper, tagEl, list)
    }) 
  })
}

function removeFilter(newList, tagWrapper, tagEl, list) {
    // remove the filter tag.
    tagWrapper.removeChild(tagEl);
    
    // reset the list.
    newList = list;
    // reset the filtered recipes.
    filteredRecipes = allRecipes;
    // relaunch the whole process.
    getIngredientList(filteredRecipes);
    getApplianceList(filteredRecipes);
    getUtensilList(filteredRecipes);
}
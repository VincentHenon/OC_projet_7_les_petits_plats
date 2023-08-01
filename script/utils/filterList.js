  // create a set to get the list without duplicate.
  let ingredientSet = new Set();
  let applianceSet = new Set();
  let utensilSet = new Set();
  let tempFilteredRecipes = [];

  let tagId = 0;
  let selectedItem = [];

  // define dropmenu buttons
  const ingredientBtn = document.querySelector(".btn_ingredients");
  const ingredientMenu = ingredientBtn.querySelector(".result_list");
  const applianceBtn = document.querySelector(".btn_appareils");
  const applianceMenu = applianceBtn.querySelector(".result_list");
  const utensilBtn = document.querySelector(".btn_utensils");
  const utensilMenu = utensilBtn.querySelector(".result_list");

// factorised functions
function checkListClick(list, menu) {
  const menuEl = menu.getElementsByTagName("li");

  // read through all <li> tags found
  [...menuEl].forEach((li) => {
    // listen to them
    li.addEventListener("click", () => {
      // get the text from the HTML element.
      let tag = li.textContent;

      // Create the TAG.
      createTag(menu, tag);
    });
  });
}

function checkInputField(list, menu, btn) {
  const inputEl = btn.querySelector(".input_dropdown");

  // listen to the input's dropdown
  inputEl.addEventListener("input", () => {
    const inputValue = inputEl.value.toLowerCase();
    // at least two letters to launch the search.
    if (inputValue.length >= 2) {
      
      // find matching item in the list
      list = list.filter((item) => item.toLowerCase().includes(inputValue));

      updateDisplay(list, menu); // update the display as the user type
      checkListClick(list, menu); // check if item is clicked in the menu

    } else {
      // rerender
      updateDisplay(list, menu);
    }
  });
}

function updateDisplay(list, menu) {
  // filter the list based on the tagList
  list = list.filter(item => !tagList.includes(item));

  const remainList = menu.querySelector(".remaining_list");

  if (list.length !== 0) {
    // if list is not empty then we build the menu
    const listEl = list.map((item) => `<li>${item}</li>`).join("");
    remainList.innerHTML = listEl;
  }
  else if (list.length === 1){
    const listEl = `<p>${item}</p>`;
    remainList.innerHTML = listEl;
  } else {
    // else there is no result
    const noResult = `<p class="noResult">Aucun résultat</p>`;
    remainList.innerHTML = noResult;
  }
}

function createTag(menu, tag) {
  const tagName = tag;
  const tagWrapper = document.querySelector(".filters_tags_wrapper");
  let tagEl;

  tagId ++;

  // prevent duplicates in tagList.
  if (!tagList.includes(tagName)) {
    tagList.push(tagName);
  }
  // update the filtered recipes variable.
  filteredRecipes = getFilteredRecipes(tagList);
  displayGallery(filteredRecipes);

  // render the filter tag.
  tagEl = document.createElement("div");
  tagEl.classList.add("filters_tag");
  tagEl.innerHTML = `
          <p class="tag_content">${tagName}</p>
          <img class="tag_xmark_${tagId}" src="./assets/icons/xMark.svg" alt="icone d'une croix" />`;
  //tagWrapper.appendChild(tagEl, menu);
  tagWrapper.insertAdjacentElement("beforeend", tagEl);

  // check tag's Xmark click.
  const tag_Xmark = tagEl.querySelector(`.tag_xmark_${tagId}`); 
 
  tag_Xmark.addEventListener("click", () => {
    removeTag(tagEl, menu)
  });

  // display selected item before list in the menu.
  const itemEl = `<div class="selected_item_wrapper">
                    <li class="selected_item">${tagName}</li>
                    <img class="selected_xmark_${tagId}" src="./assets/icons/filledXmark.svg" alt="icone d'une croix" />
                  </div>
                  `;

  const selectedList = menu.querySelector(".selected_item");
  selectedList.insertAdjacentHTML("beforeend", itemEl);

  // check selected item's Xmark click.
  const selected_Xmark = menu.querySelector(`.selected_xmark_${tagId}`);

  selected_Xmark.addEventListener("click", () => {
    removeTag(tagEl, menu)
  });
}

function removeTag(tagEl, menu) {
  const tagToRemove = tagEl.querySelector(".tag_content").textContent.toLowerCase();
  const selectedItems = menu.querySelectorAll(".selected_item_wrapper");
  let selectedItem
  selectedItems.forEach(item => {
    if (item.textContent.toLowerCase().includes(tagToRemove)) {
      selectedItem = item;
      return;
    }
  })
  
  // remove the tag from the tagList.
  tagList = tagList.filter(tag => tag.toLowerCase() !== tagToRemove);

  // remove the selected item.
  selectedItem.remove();

  // remove the filter tag.
  tagEl.remove();

  // reset the filtered recipes.
  filteredRecipes = getFilteredRecipes(tagList);

  // display the gallery
  displayGallery(filteredRecipes);

}

function getFilteredRecipes() {
  filteredRecipes = allRecipes;
  const searchValue = searchBar.value.toLowerCase();

  for (let i = 0; i < filteredRecipes.length; i++) {
    const recipe = filteredRecipes[i];
    const { name, description, ingredients } = recipe;
    const isNameMatch = name.toLowerCase().includes(searchValue);
    const isDescriptionMatch = description.toLowerCase().includes(searchValue);
    let isIngredientMatch = false;
  
    for (let j = 0; j < ingredients.length; j++) {
      const ingredient = ingredients[j].ingredient.toLowerCase();
      if (ingredient.includes(searchValue)) {
        isIngredientMatch = true;
        break;
      }
    }
  
    if (isNameMatch || isDescriptionMatch || isIngredientMatch) {
      tempFilteredRecipes.push(recipe);
    }
  }
  
  filteredRecipes = tempFilteredRecipes;
  tempFilteredRecipes = [];
  

  //check if tagList is not empty
  if (tagList.length !== 0) {
    for (let i = 0; i < filteredRecipes.length; i++) {
      const recipe = filteredRecipes[i];
      const { ustensils, appliance, ingredients } = recipe;
      let isRecipeMatch;
  
      for (let j = 0; j < tagList.length; j++) {
        const tag = tagList[j];
  
        let isIngredientMatch = false;
        for (let k = 0; k < ingredients.length; k++) {
          const ingredient = ingredients[k].ingredient.toLowerCase();
          if (ingredient.includes(tag)) {
            isIngredientMatch = true;
            break;
          }
        }
  
        if (
          isIngredientMatch ||
          appliance.toLowerCase().includes(tag) ||
          ustensils.some((ustensil) => ustensil.toLowerCase().includes(tag))
        ) {
          isRecipeMatch = true;
        } else {
          isRecipeMatch = false;
          break;
        }
      }
  
      if (isRecipeMatch) {
        tempFilteredRecipes.push(recipe);
      }
    }
  
    filteredRecipes = tempFilteredRecipes;
    tempFilteredRecipes = [];
  }
  // update all dropmenu list
  updateList();
  // create the recipes' counter
  recipesCounter(); 
  return filteredRecipes;
}

function updateList() {
  // reset all the sets.
  ingredientSet.clear();
  applianceSet.clear();
  utensilSet.clear();

  // create a set for ingredientList.
  filteredRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const ingredientName = ingredient.ingredient.toLowerCase();
      ingredientSet.add(ingredientName);
    });
  });

  // create a set for applianceList.
  filteredRecipes.forEach((recipe) => {
    const applianceName = recipe.appliance.toLowerCase();
    applianceSet.add(applianceName);
  });

  // create a set for utensilList.
  filteredRecipes.forEach((recipe) => {
    recipe.ustensils.forEach((utensil) => {
      utensilSet.add(utensil.toLowerCase());
    });
  });

  // store the list found and update the result.
  ingredientList = Array.from(ingredientSet);
  updateDisplay(ingredientList, ingredientMenu);
  checkListClick(ingredientList,ingredientMenu);
  checkInputField(ingredientList,ingredientMenu,ingredientBtn);

  
  // store the list found and update the result.
  applianceList = Array.from(applianceSet);
  updateDisplay(applianceList, applianceMenu);
  checkListClick(applianceList,applianceMenu);
  checkInputField(applianceList,applianceMenu,applianceBtn);

  // store the list found and update the result.
  utensilList = Array.from(utensilSet);
  updateDisplay(utensilList, utensilMenu);
  checkListClick(utensilList,utensilMenu);
}
  // create a set to get the list without duplicate.
  let ingredientSet = new Set();
  let applianceSet = new Set();
  let utensilSet = new Set();
  let tempFilteredRecipes = [];

  // define dropmenu buttons
  const ingredientBtn = document.querySelector(".btn_ingredients");
  const ingredientMenu = ingredientBtn.querySelector(".result_list");
  const applianceBtn = document.querySelector(".btn_appareils");
  const applianceMenu = applianceBtn.querySelector(".result_list");
  const utensilBtn = document.querySelector(".btn_utensils");
  const utensilMenu = utensilBtn.querySelector(".result_list");

// factorised functions
function checkListClick(list, menu, newList) {
  const menuEl = menu.getElementsByTagName("li");

  // read through all <li> tags found
  [...menuEl].forEach((li) => {
    // listen to them
    li.addEventListener("click", () => {
      // get the text from the HTML element.
      let selectedItem = li.textContent;

      // filter the list by finding the clicked item
      newList = list.filter(
        (item) => item.toLowerCase() === selectedItem.toLowerCase()
      );

      // Create the TAG.
      createTag(newList, selectedItem,menu);
    });
  });
  return newList;
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

      updateDisplay(newList, menu, btn); // update the display as the user type
      checkListClick(newList, menu, btn); // check if item is clicked in the menu

    } else {
      // in case where nothing typed initialize list and render it
      newList = list;
      updateDisplay(newList, menu, btn);
    }
  });
  return newList;
}

function updateDisplay(newList, menu) {
  // clear the current menu.
  menu.innerHTML = "";

  if (newList.length !== 0) {
    // if list is not empty then we build the menu
    const listEl = newList.map((item) => `<li>${item}</li>`).join("");
    menu.innerHTML = listEl;
  }
  else if (newList.length === 1){
    const listEl = `<p>${item}</p>`;
    menu.innerHTML = listEl;
  } else {
    // else there is no result
    const noResult = `<p class="noResult">Aucun résultat</p>`;
    menu.innerHTML = noResult;
  }
}

function createTag(newList, selectedItem, menu) {
    const tagName = selectedItem;
    let tagEl;
    const tagWrapper = document.querySelector(".filters_tags_wrapper");

    // if new tag is not in the tagList, push it in the array and display it
    if (!tagList.includes(tagName)) {
        tagList.push(tagName);

    // render the filter tag.
    tagEl = document.createElement("div");
    tagEl.classList.add("filters_tag");
    tagEl.innerHTML = `
            <p class="tag_content">${tagName}</p>
            <img class="tag_xmark" src="./assets/icons/xMark.svg" alt="icone d'une croix" />`;
    tagWrapper.appendChild(tagEl);
    }

    // update the filtered recipes variable.
    filteredRecipes = getFilteredRecipes(tagList);

    displayGallery(filteredRecipes);

    // display short list inside the menu.
    const listEl = `<div class="selected_list"><li class="selected_item">${newList[0]}</li><img class="selected_xmark" src="./assets/icons/filledXmark.svg" alt="icone d'une croix" /></div>`;
    menu.innerHTML = listEl;

    // select all xMark within the tags and the menu.
    const tag_Xmark = document.querySelectorAll(".tag_xmark");
    const selectedItem_Xmark = document.querySelectorAll(".selected_xmark");

    // listen to the event.
    selectedItem_Xmark.forEach((selectedItem) => { 
        selectedItem.addEventListener("click", () => {
          removeTag(tagEl);
        })
    })
    // listen to the event.
    tag_Xmark.forEach((tag) => { 
        tag.addEventListener("click", () => {
          removeTag(tagEl);
        }) 
    })
}

function removeTag(tagEl) {
    let tagToRemove = tagEl.querySelector(".tag_content").textContent.toLowerCase();

    // remove the tag from the tagList.
    tagList = tagList.filter(tag => tag.toLowerCase() !== tagToRemove);

    // reset the filtered recipes.
    filteredRecipes = getFilteredRecipes();

    // remove the filter tag.
    tagEl.remove();

    // display the gallery
    displayGallery(filteredRecipes);
}

function getFilteredRecipes() {
  filteredRecipes = allRecipes;
  const searchValue = searchBar.value.toLowerCase();

  // METHOD FILTER()
  filteredRecipes = filteredRecipes.filter(recipe =>
    recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchValue) ||
    recipe.description.toLowerCase().includes(searchValue) ||
    recipe.name.toLowerCase().includes(searchValue))
  )

  // METHOD FILTER() for DROP MENUS
  if (tagList.length !== 0) {
    filteredRecipes = filteredRecipes.filter(recipe =>
      tagList.every(tag =>
        recipe.ingredients.some(ingredient => 
          ingredient.ingredient.toLowerCase().includes(tag) ||
          recipe.appliance.toLowerCase().includes(tag) ||
          recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag))
        )
      )
    )
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
  ingredientNewList = checkListClick(ingredientList,ingredientMenu,ingredientBtn,ingredientNewList);
  ingredientNewList = checkInputField(ingredientList,ingredientMenu,ingredientBtn,ingredientNewList);

  // store the list found and update the result.
  applianceList = Array.from(applianceSet);
  updateDisplay(applianceList, applianceMenu);
  applianceNewList = checkListClick(applianceList,applianceMenu,applianceBtn,applianceNewList);
  applianceNewList = checkInputField(applianceList,applianceMenu,applianceBtn,applianceNewList);

  // store the list found and update the result.
  utensilList = Array.from(utensilSet);
  updateDisplay(utensilList, utensilMenu);
  utensilNewList = checkListClick(utensilList,utensilMenu,utensilBtn,utensilNewList);
  utensilNewList = checkInputField(utensilList,utensilMenu,utensilBtn,utensilNewList);
}
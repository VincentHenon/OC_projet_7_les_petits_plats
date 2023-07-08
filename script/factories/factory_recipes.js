function displayGallery(filteredRecipes) {
  const section = document.getElementById("recipes");
  section.innerHTML = "";

    filteredRecipes.forEach((recipe) => {
      const { id } = recipe;
      const cardModel = createCard(recipe);

      // Create a new card element
      const cardEl = document.createElement("article");
      cardEl.classList.add("recipe_card");
      cardEl.setAttribute("article-ID", `${id}`);
      cardEl.innerHTML = cardModel;

      section.appendChild(cardEl);
    });
}

function createCard(recipe) {
  const { id, description, ingredients, name, time } = recipe;

  let ingredientItems = "";
  for (let i = 0; i < ingredients.length; i++) {
    const ingredient = ingredients[i];
    const ingredientItem = ingredient.ingredient;
    const quantity = ingredient.quantity ? `${ingredient.quantity}` : " ";
    const unit = ingredient.unit ? `${ingredient.unit}` : " ";

    if (unit === "grammes") {
      ingredient.unit = "g";
    }

    ingredientItems += `<div class="list_item">
                                <p><strong>${ingredientItem} </strong></p>
                                 <p>${quantity} ${unit}</p>
                            </div>`;
  }

  // Create the card HTML structure using template literals
  const card = `
          <div class="card_wrapper">
              <img src="./assets/recettes/Recette${id}.jpg" alt="Recette : ${name}" class="recette_image">
              <div class="time">
                <p>${time}min</p>
              </div>
            <div class="content_wrapper">
              <h2 class="name">${name}</h2>
              <p class="subtitle">recette</p>
              <p class="description">${description}</p> 
              <p class="subtitle">ingrédients</p>
              <ul class="ingredients_list"> 
                ${ingredientItems} 
              </ul>
            </div>
          </div>
        `;

  // Return the card
  return card;
}

function recipesCounter() {
  const counterWrapper = document.querySelector(".recipes_counter");
  const count = filteredRecipes.length;
  let error = "";
  

  counterWrapper.innerHTML = "";
  count <= 1 ? counterWrapper.innerHTML = `<p>${count} recette</p>` : counterWrapper.innerHTML = `<p>${count} recettes</p>`;

  if (count === 0) {
    error = `<p>😢 Aucune recette ne contient la recherche ☞ "${searchBar.value.toLowerCase()}", vous pouvez chercher «
    tarte aux pommes », « poisson »</p>`
    document.getElementById("error").innerHTML = error;
  }
  else {
    error = "";
    document.getElementById("error").innerHTML = error;
  }
}
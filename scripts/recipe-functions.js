"use strict";
// get save recipe modified
const loadRecipe = function () {
  const recipesJSON = localStorage.getItem("recipes");
  try {
    return recipesJSON ? JSON.parse(recipesJSON) : [];
  } catch (e) {
    return [];
  }
};

// save recipe
const saveRecipe = (recipes) => {
  localStorage.setItem("recipes", JSON.stringify(recipes));
};

// Generate summery
const generateSummary = (recipe) => {
  const countCompleted = recipe.ingredients.filter((ingredient) => {
    return ingredient.completed;
  });

  const checkAllCompleted = recipe.ingredients.every((ingredient) => {
    return ingredient.completed;
  });

  if (countCompleted.length < 1) {
    return ` You have none of the ingredients`;
  } else if (countCompleted.length >= 1 && !checkAllCompleted) {
    return ` You have some of the ingredients`;
  } else if (checkAllCompleted) {
    return `You have all the ingredients`;
  }
};

// Generate recipes Dom elemnts
const generateRecipes = (recipe) => {
  const container = document.createElement("a");
  container.classList.add("recipe-container");

  const titleEl = document.createElement("h3");
  titleEl.classList.add("title-text");

  const summaryEl = document.createElement("p");
  summaryEl.classList.add("summary-text");

  // Setup recipeEl
  container.setAttribute("href", `./edit.html#${recipe.id}`);

  // Setup titleEl
  if (recipe.title.length < 1) {
    titleEl.textContent = "Untiteled recipe";
  } else {
    titleEl.textContent = recipe.title;
  }
  container.appendChild(titleEl);
  // Setup summaryEl
  summaryEl.textContent = generateSummary(recipe);
  container.appendChild(summaryEl);

  return container;
};

// render recipe
const renderRecipe = (recipes, filters) => {
  const recipeEl = document.querySelector("#recipe");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );
  recipeEl.innerHTML = "";

  if (filteredRecipes.length < 1) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No Recipes Found!!";
    recipeEl.appendChild(emptyMessage);
  } else {
    filteredRecipes.forEach((recipe) => {
      recipeEl.appendChild(generateRecipes(recipe));
    });
  }
};

/* reciptes = [{
id: ,
tile: ,
summary: ,
ingredients: [{
  id: ,
  text: ,
  completed:
}]
}]
*/

// remove ingredient
const removeIngredient = (ingredientId) => {
  const ingreIndex = recipe.ingredients.findIndex(
    (ingredient) => ingredient.id === ingredientId
  ); //import

  if (ingreIndex !== -1) {
    recipe.ingredients.splice(ingreIndex, 1);
  }
};

/// Generate ingredients
const generateIngredients = (ingredient) => {
  const container = document.createElement("div");
  container.classList.add("ing-container");
  const wrapper = document.createElement("div");

  const checkBoxEl = document.createElement("input");
  const textEl = document.createElement("span");
  textEl.classList.add("ing-text");
  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-ing-button");

  // Setup checkbox
  checkBoxEl.setAttribute("type", "checkbox");
  wrapper.appendChild(checkBoxEl);
  checkBoxEl.checked = ingredient.completed;

  // check box event listener
  checkBoxEl.addEventListener("click", (e) => {
    ingredient.completed = !ingredient.completed;
    saveRecipe(recipes);
    renderIngredients(recipe.ingredients);
  });

  // Setup ingredient text
  textEl.textContent = ingredient.text;
  wrapper.appendChild(textEl);

  // Setup containers
  container.appendChild(wrapper);

  // Setup removeButton
  removeButton.textContent = "remove";
  container.appendChild(removeButton);

  // remove ingredient event listener
  removeButton.addEventListener("click", (e) => {
    removeIngredient(ingredient.id);
    saveRecipe(recipes);
    renderIngredients(recipe.ingredients);
  });

  return container;
};

/// render ingredients
const renderIngredients = (ingredients) => {
  const ingredientsArea = document.querySelector(".ingerdients-area");
  ingredientsArea.innerHTML = "";

  ingredients.forEach((ingredient) => {
    ingredientsArea.appendChild(generateIngredients(ingredient));
  });
};

/// delete recipe
const deleteRecipe = (recipeId) => {
  const recipteIndex = recipes.findIndex((recipe) => {
    return recipe.id === recipeId;
  });

  if (recipteIndex !== -1) {
    recipes.splice(recipteIndex, 1);
  }
};

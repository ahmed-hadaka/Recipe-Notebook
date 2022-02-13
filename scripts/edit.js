"use strict";

const titleEl = document.querySelector("#title");
const bodyEl = document.querySelector("#text-area");
const addForm = document.querySelector(".add-ingredients");
const deleteButton = document.querySelector(".delete-recipe");

const recipeId = location.hash.substring(1);

// get saved recipe
let recipes = loadRecipe();

// check it's still avilabel
let recipe = recipes.find((recipe) => recipe.id === recipeId);

if (!recipe) {
  location.assign("./index.html");
}

// get recipe details into edit page
titleEl.value = recipe.title;
bodyEl.value = recipe.body;

// initial render ingredients
renderIngredients(recipe.ingredients);

// edit title event listener
titleEl.addEventListener("input", (e) => {
  recipe.title = e.target.value;
  saveRecipe(recipes);
});

// edit body event listener
bodyEl.addEventListener("input", (e) => {
  recipe.body = e.target.value;
  saveRecipe(recipes);
});

// add ingredients button event listener
addForm.addEventListener("submit", (e) => {
  const text = e.target.elements.newIngredient.value.trim();
  e.preventDefault();

  if (text.length > 0) {
    recipe.ingredients.push({
      id: uuidv4(),
      text: text,
      completed: false,
    });
    saveRecipe(recipes);
    e.target.elements.newIngredient.value = "";
    renderIngredients(recipe.ingredients);
  }
});

// delete recipe event listener
deleteButton.addEventListener("click", (e) => {
  deleteRecipe(recipeId);
  saveRecipe(recipes);
  location.assign("./index.html");
});

// window storage event listener
window.addEventListener("storage", (e) => {
  if (e.key === "recipes") {
    recipes = JSON.parse(e.newValue);
  }
  recipe = recipes.find((recipe) => recipe.id === recipeId);

  if (!recipe) {
    location.assign("./index.html");
  }

  titleEl.value = recipe.title;
  bodyEl.value = recipe.body;
  renderIngredients(recipe.ingredients);
});

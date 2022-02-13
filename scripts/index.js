"use strict";

// get save recipe
let recipes = loadRecipe();

const filters = {
  searchText: "",
};

renderRecipe(recipes, filters);

// search box event listener
document.querySelector(".search-text").addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderRecipe(recipes, filters);
});

// add recipe event listener
document.querySelector(".button").addEventListener("click", (e) => {
  const id = uuidv4();
  recipes.push({
    id: id,
    title: "",
    body: "",
    ingredients: [],
  });
  saveRecipe(recipes);
  location.assign(`./edit.html#${id}`);
});

// window storage event listenr
window.addEventListener("storage", (e) => {
  if (e.key === "recipes") {
    recipes = JSON.parse(e.newValue);
    renderRecipe(recipes, filters);
  }
});

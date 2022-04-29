
import { hideLoader } from "./loading.js";
//FUNCTIONS
export const displayRecipe = (array, section) => {

    const recipes = array.map((recipe) => 
        `<a href="single-recipe.html" class="recipe-item ${recipe.category}" data-id="${recipe.title}">
        <div class="img-container"><img src="${recipe.image}" class="recipe-img"></div>
        <p class="recipe-name">${recipe.title}</p>
       </a>`
    ).join('');
    console.log(recipes)
    section.innerHTML = recipes;
    hideLoader();
}


export const displayCategories = (section, categories) => {
    section.innerHTML = categories.map((category) => {
        return `<a href="category.html" class="category-item" data-id="${category.title}">
        <div class="img-container"><img src="${category.img}" class="category-img"></div>
        <p class="category-name">${category.title}</p>
    </a>`
    }).join('');
}
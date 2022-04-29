
import { hideLoader } from "./loading.js";
//FUNCTIONS
export const displayRecipe = (array, section) => {

    const recipes = array.map((recipe) => 
        `<a href="single-recipe.html" class="recipe-item ${recipe.category}" data-id="${recipe.title}">
        <img class="recipe-img" src="${recipe.image}">
        <div class="recipe-info">
            <h2 class="recipe-title">${recipe.title}</h2>
            <p>${recipe.desc}</p>
        </div>
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
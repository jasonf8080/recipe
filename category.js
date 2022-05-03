import { fetchData } from "./fetchData.js"; 
import { displayRecipe } from "./display.js";



const selectedCategory = localStorage.getItem('category');
const categoryTitle = document.querySelector('.category-page .title');
const categoryRecipesSection = document.querySelector('.category-recipe-grid');


//EVENT LISTENERS


//FUNCTIONS
const load = async() => {
    document.title = selectedCategory;
    categoryTitle.textContent = selectedCategory;

    const categoriesArray = await filterCategories(selectedCategory);
    displayRecipe(categoriesArray, categoryRecipesSection);
   
    //single recipe module
     const recipes = document.querySelectorAll('.recipe-item');
     selectRecipe(recipes);


     const homeBtn = document.querySelector('#home-btn')
     homeBtn.addEventListener('click', () => {
        window.location = 'index.html'
    })
}






const filterCategories = async(category) => {
    const data = await fetchData();
    let array = [];
    for(let i = 0; i < data.length; i++){
       if(data[i].category === category){
          array.push(data[i])
       }
    }

    return(array);
}


export const selectRecipe = (recipes) => {
    recipes.forEach((recipe) => {
        recipe.addEventListener('click', (e) => {
            const recipeID = e.currentTarget.dataset.id;
            localStorage.setItem('recipeID', recipeID);
        })
    })
}



window.addEventListener('DOMContentLoaded', load)
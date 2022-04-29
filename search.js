import { fetchData } from "./fetchData.js";
import { displayRecipe } from "./display.js";
import { selectRecipe } from "./category.js"

let searchValue = localStorage.getItem('searchValue');
searchValue = searchValue.toLowerCase();
const searchItemsSection = document.querySelector('.search-items-grid')
const inputHeader = document.querySelector('.input-header');
const searchPageInput = document.querySelector('.search-page-input');



//EVENT LISTENERS
const load = async() => {
    
    const data = await fetchData();
    const results = getResults(data, searchValue);
    inputHeader.textContent = `Showing results for "${searchValue}"`;

    
   displayRecipe(searchItemsSection, results);

   const searchRecipes = [...document.querySelectorAll('.recipe-item')];
   selectRecipe(searchRecipes);
 
}


searchPageInput.addEventListener('keyup', async(e) => {
    let inputValue = e.target.value;
    
    if(inputValue){
        //localStorage.removeItem('searchValue');
        const data = await fetchData();
        inputHeader.textContent = `Showing results for "${inputValue}"`;
        const newResults = getResults(data, inputValue);
        //if newResults.length < 1, textContent.Sorry no results matched your search
        displayRecipe(searchItemsSection, newResults);

        const searchRecipes = [...document.querySelectorAll('.recipe-item')];
        selectRecipe(searchRecipes);
    } else {
        inputHeader.textContent = '';
        searchItemsSection.innerHTML = null;
    }

    
})


//FUNCTIONS  
const getResults = (array, value) => {
    let searchItems = [];
    for(let i = 0; i < array.length; i++){
        if(array[i].title.toLowerCase().includes(value)){
            searchItems.push(array[i])
        }
    }
    return searchItems;
}




window.addEventListener('DOMContentLoaded', load);
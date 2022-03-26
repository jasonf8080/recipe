import { fetchData } from "./fetchData.js";

const trendingSection = document.querySelector('.trending-grid');
let trendingIndex = 0;
const arrows = document.querySelector('.pages-div');


const setTrending = async () => {
    const data = await fetchData();
    
    let trending = [];
    for(let i = 0; i < data.length; i++){
       if(data[i].trending){
          trending.push(data[i])
       }
    }

    return trending;
}

const displayRecipe = async(array, section) => {
    section.innerHTML = array.map((recipe) => 
        `<a href="#selected-recipe" class="recipe-item ${recipe.category}">
        <img class="recipe-img" src="${recipe.image}">
        <div class="recipe-info">
            <h2 class="recipe-title">${recipe.title}</h2>
            <p>${recipe.desc}</p>
        </div>
       </a>`
    ).join('');
    
}

const paginate = async () => {
    const trending = await setTrending();

    const itemsPerPage = 6;
    const numberOfPages = Math.ceil(trending.length / itemsPerPage);
    
    const paginateArray = Array.from({length: numberOfPages}, (_, index) => {
        const start = index * itemsPerPage;
        return trending.slice(start, start + itemsPerPage);
    })
    
    return paginateArray;
}




const setupTrending = async () => {
    const trending = await setTrending();
    const activeArray = await paginate();
   
    
    displayRecipe(activeArray[trendingIndex], trendingSection);
}




arrows.addEventListener('click', async(e) => {
    const trending = await setTrending();
    const activeArray = await paginate();
    

    if(e.target.classList.contains('fa-arrow-left')){
       
       trendingIndex--;
       if(trendingIndex < 0){
        trendingIndex = activeArray.length - 1;
    }

      setupTrending();

    } else if(e.target.classList.contains('fa-arrow-right')){
    
        trendingIndex++;
        if(trendingIndex > activeArray.length - 1){
            trendingIndex = 0;
        }
        
       setupTrending();
    }
})

window.addEventListener('DOMContentLoaded', () => {
    setupTrending();
})
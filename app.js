import { fetchData } from "./fetchData.js";
import { setTrending } from "./trending.js";
import { categoriesData } from "./utils.js";
import { paginate } from "./trending.js";
import { displayRecipe } from "./display.js";
import { displayCategories } from "./display.js";
import { selectRecipe } from "./category.js";
import { hideLoader, showLoader } from "./loading.js";



const trendingSection = document.querySelector('.trending-grid');
const categorySection = document.querySelector('.categories-grid');
const numbers = document.querySelector('.pages-div');
const numbersElements = [...document.querySelectorAll('.number')];
let index = 0;
let pages = [];
const loader = document.querySelector('.loader-container');
const searchBtn = document.querySelector('.search-btn');
const exitBtn = document.querySelector('.exit-btn');
const searchRecipeBtn = document.querySelector('.search-bar a');
const searchModal = document.querySelector('.search-modal');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const menuBtn = document.querySelector('.menu');
const menuExitBtn = document.querySelector('.side-menu .menu-exit');
const sideMenu = document.querySelector('.side-menu');







//EVENT LISTENERS//
const load = async() =>{

    document.title = 'Home';
    const data = await fetchData();
    const trending = setTrending(data);
   
   pages = paginate(trending);//whole array
   displayRecipe(pages[index], trendingSection);
   displayCategories(categorySection, categoriesData);

   
   const categories = [...document.querySelectorAll('.category-item')];
   selectCategory(categories);

   const trendingRecipes = [...document.querySelectorAll('.recipe-item')];
    selectRecipe(trendingRecipes);
   
}

menuBtn.addEventListener('click', () => {
    sideMenu.classList.add('active');
})

menuExitBtn.addEventListener('click', () => {
    sideMenu.classList.remove('active');
})



searchBtn.addEventListener('click', () => {
    searchModal.classList.add('active');
    window.addEventListener('scroll', disableScroll);
    header.classList.add('blur');
    nav.classList.add('blur');
})


exitBtn.addEventListener('click', () => {
    searchModal.classList.remove('active');
    window.removeEventListener('scroll', disableScroll);
    header.classList.remove('blur');
    nav.classList.remove('blur');
})



searchRecipeBtn.addEventListener('click', (e) => {
    const inputValue = document.querySelector('.search-bar input').value;
    const alert = document.querySelector('.alert');

    if(!inputValue){
        e.preventDefault();
        alert.style.display = 'block';
        setTimeout(() => {
            alert.style.display = 'none';
        }, 1500)
    } else {
        localStorage.setItem('searchValue', inputValue);
    }
})




numbers.addEventListener('click', async(e) => {
    if(e.target.classList.contains('number')){
       index = parseInt(e.target.dataset.id - 1);
       await fetchData();
       displayRecipe(pages[index], trendingSection);

       
       
       const trendingRecipes = [...document.querySelectorAll('.recipe-item')];
       selectRecipe(trendingRecipes);
    }
  })
  

  numbersElements.forEach(number => {
    number.addEventListener('click', () => {
        numbersElements.forEach(number => {
            number.classList.remove('active');
        })
        number.classList.add('active');
    })
}) 



 
const selectCategory = (categories) => {
    categories.forEach((category) => {
        category.addEventListener('click', (e) => {
           let selectedCategory = e.currentTarget.dataset.id;
            localStorage.setItem('category', selectedCategory);
        })
    })
}


//FUNCTIONS 

function disableScroll(){
    window.scrollTo(0, 0);
}



window.addEventListener('load', load);

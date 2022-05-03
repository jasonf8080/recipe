import { fetchData } from "./fetchData.js";
import { hideLoader } from "./loading.js";

const url = 'data.json';

export const sort = async() => {
    let data = await fetchData(url);
    const sorted = data.sort((a, b) => {
        if(a.title.toLowerCase() < b.title.toLowerCase()){
            return -1
        }

        if(a.title.toLowerCase() > b.title.toLowerCase()){
            return 1;
        }

        return 0;
    })

    hideLoader();
    return sorted;
}




export const paginateAll = async() => {

    const sortedItems = await sort();
    const itemsPerPage = 12;
    const numberOfPages = Math.ceil(sortedItems.length / itemsPerPage);
    const numbersDiv = document.querySelector('.numbers-div');
    
    const paginateArray = Array.from({length: numberOfPages}, (_, index) => {
        const start = index * itemsPerPage;
        return sortedItems.slice(start, start + itemsPerPage);
    })

    const numbers = paginateArray.map((_, index) => {
        return `<a href="#all-recipes-section" class="number" data-id="${index + 1}">${index + 1}</a>`;
    }).join('');

    numbersDiv.innerHTML = numbers;

   return paginateArray;
}





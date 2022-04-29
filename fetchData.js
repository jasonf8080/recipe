import { showLoader } from "./loading.js";

const url = 'data.json';

export const fetchData = async () => {
    showLoader();
    try{
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        return data;
       
    } catch(error){
        console.log(error)
    }
    
}


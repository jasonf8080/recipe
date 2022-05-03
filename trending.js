//FUNCTIONS
export const setTrending = (data) => { 
    const trending = data.filter((item) =>{
        return item.trending === true;
    })
    return trending;
}


export const paginate = (array) => {

    const itemsPerPage = 6;
    const numberOfPages = Math.ceil(array.length / itemsPerPage);
    
    const paginateArray = Array.from({length: numberOfPages}, (_, index) => {
        const start = index * itemsPerPage;
        return array.slice(start, start + itemsPerPage);
    })
    
    return paginateArray;
}



  
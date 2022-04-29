const loader = document.querySelector('.loader-container');

export const hideLoader = () => {
    loader.classList.add('hide');
}

export const showLoader = () => {
    loader.classList.remove('hide');
}
const url = 'data.json';

export const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


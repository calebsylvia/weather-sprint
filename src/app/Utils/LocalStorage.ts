
export const saveLocal = (city: string) => {
    
    let favorites = getLocal();

    if(!favorites.includes(city)){
        favorites.push(city);
    }

    localStorage.setItem("Favorites", JSON.stringify(favorites));
}

export const getLocal = () => {
    let localData = localStorage.getItem("Favorites");

    if(localData == null){
        return [];
    }
        return JSON.parse(localData);
}
    

export const removeLocal = (city: string) => {
        let favorites = getLocal();
        let index = favorites.indexOf(city);
    
        favorites.splice(index, 1);
    
        console.log(favorites)
        localStorage.setItem("Favorites", JSON.stringify(favorites))
}


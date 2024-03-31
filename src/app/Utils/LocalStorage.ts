
export const saveLocal = (location: string) => {
    if (typeof window !== 'undefined') {
        let favorites = getLocal();

        if(!favorites.includes(location)){
            favorites.push(location);
            console.log(favorites)
        }

        localStorage.setItem("Favorites", JSON.stringify(favorites));
    }
};

export const getLocal = () => {
    if (typeof window !== 'undefined') {
        let localStorageData = localStorage.getItem("Favorites");

        if(localStorageData == null){
            return [];
        }

        return JSON.parse(localStorageData);
    }
    return [];
};

export const removeLocal = (location: string) => {
    if (typeof window !== 'undefined') {
        let favorites = getLocal();
        let namedIndex = favorites.indexOf(location);

        favorites.splice(namedIndex, 1);
        localStorage.setItem("Favorites", JSON.stringify(favorites));
    }
};


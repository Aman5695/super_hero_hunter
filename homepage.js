document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 1;
    const itemsPerPage = 20; //Number of items to show per page

    const superHeroesContainer = document.getElementById('superheroes');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const currentPageElement = document.getElementById('currentPage');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const searchBar = document.getElementById('searchBar');
    const searchList = document.getElementById('search-list');

    let data = [];

    // fetch data from api
    fetch('https://akabab.github.io/superhero-api/api/all.json').then(res => res.json()).then(result => {
        data = result;
        showPage(currentPage);
    }).catch(err => console.error('Error getting data:', err))

    function showPage(page){
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData  = data.slice(startIndex, endIndex);

        superHeroesContainer.innerHTML = '';

        paginatedData.forEach(superHero => {
            const card = document.createElement('div');
            card.dataset.id = superHero.id;
            card.classList.add('superhero-card');

            const isFavorite = favorites.some(favorite => favorite.id === superHero.id);
            card.innerHTML = `
            <img src="${superHero.images.sm}" alt="${superHero.name}">
            <h3 class="superhero-name">${superHero.name}</h3>
            <p><strong>Full Name :</strong>${superHero.biography.fullName}</p>
            <p><strong>Alter Ego :</strong>${superHero.biography.alterEgos}</p>
            <button class="add-to-favorites">${isFavorite ? 'Remove from Favorites':'Add to Favorites'}</button>
            `;

            if(isFavorite){
                const addToFavoritesButton = card.querySelector(".add-to-favorites");
                addToFavoritesButton.classList.add('remove-favorites');
            }

            superHeroesContainer.appendChild(card);

            const superHeroName = card.querySelector('.superhero-name');
            superHeroName.addEventListener('click', () => handleSuperHeroClick(superHero));

            const addToFavoritesButton = card.querySelector('.add-to-favorites');
            addToFavoritesButton.addEventListener('click', () => addToFavorites(superHero, "page"));
        });

        currentPageElement.textContent = `Page ${page}`;

        prevPageButton.disabled = page === 1;
        nextPageButton.disabled = page === Math.ceil(data.length / itemsPerPage); 
    };

    function addToFavorites(superHero, params){
        const superHeroId = superHero.id;
        const superHeroName = superHero.name;
        const superHeroImage = superHero.images.sm;

        const isFavorite = favorites.some(favorites => favorites.id === superHeroId);
        if(!isFavorite){
            favorites.push({id:superHeroId, name:superHeroName, image:superHeroImage});
        }else{
            favorites = favorites.filter(favorite => favorite.id !== superHeroId);
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        if(params === "list"){
            showFilteredResults(filteredData);
        }else{
            showPage(currentPage);
        }

    }

    function handleSuperHeroClick(superHero){
        const superHeroId = superHero.id;
        const superHeroName = superHero.name;
        window.location.href = `./files/hero-details.html?id=${superHeroId}&name=${superHeroName}`
    }

    function handleSearch(){
        const searchTerm = searchBar.value.trim().toLowerCase();
        if(searchTerm.length > 2){
            filteredData = data.filter(superHero => superHero.name.toLowerCase().includes(searchTerm));
            // console.log("filterdData", filteredData)
            showFilteredResults(filteredData);
        }else{
            filteredData = [];
            clearFilteredResults();
        }
    }

    function showFilteredResults(data){
        // console.log("superHero",data)
        searchList.innerHTML = '';
        data.forEach(superHero => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('filtered-result-item');
            const isFavorite = favorites.some(favorite => favorite.id === superHero.id);
            resultItem.innerHTML = `
            <div class="filtered-superhero-detail">
            <img class="filtered-superhero-image" src="${superHero.images.sm}" alt="${superHero.name}">
            <h3 class="filtered-superhero-name">${superHero.name}</h3>
            </div>
            <button class="add-to-favorites">${isFavorite ? "Remove from Favorites":"Add to Favorites"}</button>
            `;

            if(isFavorite){
                const addToFavoritesButton = resultItem.querySelector(".add-to-favorites");
                addToFavoritesButton.classList.add('remove-favorites');
            }
            
            searchList.appendChild(resultItem);
            const superHeroName = resultItem.querySelector('.filtered-superhero-name');
            superHeroName.addEventListener('click', () => handleSuperHeroClick(superHero));

            const addToFavoritesButton = resultItem.querySelector('.add-to-favorites');
            addToFavoritesButton.addEventListener('click', () => addToFavorites(superHero, "list"));
        });
    }

    function clearFilteredResults(){
        searchList.innerHTML = '';
    }

    searchBar.addEventListener('input', handleSearch);

    prevPageButton.addEventListener('click', () => {
        if(currentPage > 1){
            currentPage--;
            showPage(currentPage);
        }
    });

    nextPageButton.addEventListener('click', () => {
        if(currentPage < Math.ceil(data.lenght/itemsPerPage)){
            currentPage++;
            showPage(currentPage);
        }
    });
});
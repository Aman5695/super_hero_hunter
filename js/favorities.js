document.addEventListener('DOMContentLoaded', function(){
    const favoritesContainer = document.getElementById('favorites-container');

    // retrieve fovorites from local storage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Loop favorites and create html for each superhero
    favorites.forEach(superHero => {
        const card = document.createElement('div');
        card.classList.add('superhero-card');

        card.innerHTML =`
        <img class="filtered-superhero-image" src="${superHero.image ? superHero.image:superHero.images}" alt="${superHero.name}">
            <h3 class="superhero-name">${superHero.name}</h3>
            </div>
            <button class="remove-from-favorites">Remove from Favorites</button>
        `;

        const removeFromFavoritesButton = card.querySelector('.remove-from-favorites');
        removeFromFavoritesButton.addEventListener('click', function(){
            //remove superhero from favorites
            const updateFavorites = favorites.filter(favorite => favorite.id !== superHero.id);
            localStorage.setItem('favorites', JSON.stringify(updateFavorites));

            //Remove card from the DOM
            card.remove();
        });

        const superHeroName = card.querySelector('.superhero-name');
        superHeroName.addEventListener('click', () => handleSuperHeroClick(superHero));

        favoritesContainer.appendChild(card);
    });

    function handleSuperHeroClick(superHero){
        const superHeroId = superHero.id;
        const superHeroName = superHero.name;
        window.location.href = `../files/hero-details.html?id=${superHeroId}&name=${superHeroName}`;
    }
})
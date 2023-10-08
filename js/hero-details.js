document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const superHeroId = urlParams.get("id");
  const superHeroName = urlParams.get("name");
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  fetch(`https://akabab.github.io/superhero-api/api/id/${superHeroId}.json`)
    .then((res) => res.json())
    .then((superHeroData) => {
        
      const supeeHeroDetailsElement =
        document.getElementById("superhero-details");
      const isFavorite = favorites.some
        (favorite => favorite.id === superHeroId
      );
      supeeHeroDetailsElement.innerHTML = `
        <img src="${superHeroData.images.sm}" alt="${superHeroData.name}">
        <div class='card-detail-container'>
        <h2>${superHeroData.name}</h2>
        <div class='super-hero appearence'>
        <h3>Appearence</h3>
        <div class='appearence-inner'>
        <div><h4>Gender</h4><span>${
          superHeroData.appearance.gender
        }</span></div>
        <div><h4>Race</h4><span>${superHeroData.appearance.race}</span></div>
        <div><h4>Height</h4><span>${
            superHeroData.appearance.height[1]
          }</span></div>
          <div><h4>Weight</h4><span>${superHeroData.appearance.weight[1]}</span></div>
        </div>
        </div>
       <div class='super-hero powerstats'>
        <h3>PowerStats</h3>
        <div class='appearence-inner power-stats'>
        <div><h4>Combat</h4><span>${
          superHeroData.powerstats.combat
        }</span></div>
        <div><h4>Durability</h4><span>${
          superHeroData.powerstats.durability
        }</span></div>
        <div><h4>Intelligence</h4><span>${
          superHeroData.powerstats.intelligence
        }</span></div>
        <div><h4>Power</h4><span>${superHeroData.powerstats.power}</span></div>
        <div><h4>Speed</h4><span>${superHeroData.powerstats.speed}</span></div>
        <div><h4>Strength</h4><span>${
          superHeroData.powerstats.strength
        }</span></div>
        </div>
        </div>
        <div class="super-hero powerstats">
        <h3>work</h3>
        <div class='appearence-inner work'>
        <div><h4>Base</h4><span>${superHeroData.work.base}</span></div>
        <div><h4>Occupation</h4><span>${
          superHeroData.work.occupation
        }</span></div>
        </div>
        </div>
        <button class="add-to-favorites">${
          isFavorite ? "Remove from Favorites" : "Add to Favorites"
        }</button>
        </div>
        `;

      if (isFavorite) {
        const addToFavoritesButton =
          supeeHeroDetailsElement.querySelector(".add-to-favorites");
        addToFavoritesButton.classList.add("remove-favorites");
      }

      const addToFavoritesButton =
        supeeHeroDetailsElement.querySelector(".add-to-favorites");
      addToFavoritesButton.addEventListener("click", function () {
        const isFavorite = favorites.some(
          favorite => favorite.id === superHeroId
        );

        if (!isFavorite) {
          favorites.push({
            id: superHeroId,
            name: superHeroData.name,
            images: superHeroData.images.sm,
          });
        } else {
            favorites = favorites.filter(
            favorite => favorite.id !== superHeroId
          );
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));

        //update the button text
        addToFavoritesButton.textContent = isFavorite
          ? "Add to Favorites"
          : "Remove from Favorites";
      });
    })
    .catch((err) => console.log("Error getting Details:", err));
});

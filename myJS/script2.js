let favouriteContainer = document.getElementById("favouriteContainer");
let myFavourites = JSON.parse(localStorage.getItem("myFavourites")) || [];

function renderFavouriteList() {
    favouriteContainer.innerHTML = "";

    myFavourites.forEach(hero => {
        let favouriteItem = document.createElement("li");
        favouriteItem.classList.add("favouriteItem");
        favouriteItem.innerHTML = `
            <div class="favDiv">
                <img class="favImage" src="${hero.image.url}">
                <div class="rightD">
                    <p>${hero.id}</p>
                    <p>${hero.name}</p>
                </div>
                <img class="deleteimage" onClick="deleteFav(${hero.id})" src="https://cdn-icons-png.flaticon.com/512/657/657059.png">
            </div>
        `;
        favouriteContainer.appendChild(favouriteItem);
    });
}

function deleteFav(heroId) {
    myFavourites = myFavourites.filter(hero => hero.id !== heroId);
    localStorage.setItem("myFavourites", JSON.stringify(myFavourites));
    renderFavouriteList();
}

renderFavouriteList();

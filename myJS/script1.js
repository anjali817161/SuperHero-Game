let lists = document.getElementById("lists");
let inputValue = document.getElementById("input1");
let myFavourites = JSON.parse(localStorage.getItem("myFavourites")) || [];
localStorage.setItem("myFavourites", JSON.stringify(myFavourites));

const API_TOKEN = "1211886636113722";

// Handle Search Input
function handleInput() {
    const searchValue = inputValue.value.trim();
    if (!searchValue) return alert("Please enter a superhero name!");
    const url = `https://www.superheroapi.com/api.php/${API_TOKEN}/search/${searchValue}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.response === "error") {
                alert("No superhero found!");
                return;
            }
            renderHeroList(data.results);
        })
        .catch(err => console.error("Error fetching superheroes:", err));
}

// Render List of Heroes
function renderHeroList(heroes) {
    lists.innerHTML = "";
    heroes.forEach(hero => {
        const isFavourite = myFavourites.some(fav => fav.id === hero.id);

        let listItem = document.createElement("li");
        listItem.classList.add("listItem");
        listItem.innerHTML = `
            <div class="content">
                <div class="leftDiv">
                    <a href="./myHTML/detail.html">
                        <img onClick="handleShowDetail(${hero.id})" class="listimage" src="${hero.image.url}">
                    </a>
                </div>
                <div class="rightDiv">
                    <span class="myId">Id: ${hero.id}</span>
                    <span class="myName">${hero.name}</span>
                </div>
                <div class="btn">
                    <button onClick="handleAddFavourite(${hero.id})">
                        <img class="likeImage" src="https://cdn-icons-png.flaticon.com/512/3128/3128313.png" alt="" style="filter: ${isFavourite ? 'grayscale(0%)' : 'grayscale(100%)'};">
                    </button>
                </div>
            </div>
        `;
        lists.appendChild(listItem);
    });
}

// Save Selected Hero for Details Page
function handleShowDetail(heroId) {
    localStorage.setItem("givenId", heroId);
    console.log("Details functionality called for hero:", heroId);
}

// Add Hero to Favourites
function handleAddFavourite(heroId) {
    const hero = Array.from(lists.querySelectorAll(".listItem")).find(item =>
        item.querySelector(".myId").textContent.includes(heroId)
    );

    if (!hero) return;

    const heroData = {
        id: heroId,
        name: hero.querySelector(".myName").textContent,
        image: { url: hero.querySelector(".listimage").src }
    };

    const alreadyFavourite = myFavourites.some(fav => fav.id === heroId);
    if (!alreadyFavourite) {
        myFavourites.push(heroData);
    } else {
        myFavourites = myFavourites.filter(fav => fav.id !== heroId);
    }

    localStorage.setItem("myFavourites", JSON.stringify(myFavourites));
    handleInput(); // Re-render the list with updated favorite status
}

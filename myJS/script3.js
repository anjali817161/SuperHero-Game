const detailContainer = document.getElementById("detailContainer");
const heroId = localStorage.getItem("givenId");
const API_TOKEN = "1211886636113722";

fetch(`https://www.superheroapi.com/api.php/${API_TOKEN}/${heroId}`)
    .then(response => response.json())
    .then(hero => {
        if (hero.response === "error") {
            alert("Error fetching hero details!");
            return;
        }
        renderHeroDetails(hero);
    })
    .catch(err => console.error("Error fetching hero details:", err));

function renderHeroDetails(hero) {
    detailContainer.innerHTML = `
        <div>
            <img class="detailImg" src="${hero.image.url}">
            <p><strong>ID:</strong> ${hero.id}</p>
            <p><strong>Name:</strong> ${hero.name}</p>
            <h4>Appearance</h4>
            <p>Gender: ${hero.appearance.gender}</p>
            <p>Race: ${hero.appearance.race}</p>
            <p>Eye Color: ${hero.appearance["eye-color"]}</p>
            <p>Hair Color: ${hero.appearance["hair-color"]}</p>
            <h4>Powerstats</h4>
            <p>Intelligence: ${hero.powerstats.intelligence}</p>
            <p>Strength: ${hero.powerstats.strength}</p>
            <p>Speed: ${hero.powerstats.speed}</p>
            <p>Durability: ${hero.powerstats.durability}</p>
            <p>Power: ${hero.powerstats.power}</p>
        </div>
    `;
}

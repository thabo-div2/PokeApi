let base_URL = "https://pokeapi.co/api/v2/pokemon/";

function getPokemonList(url) {
  fetch(url)
    .then((response) => response.json())

    .then((data) => {
      console.log(data);
      let pokemon = data.results;
      let container = document.querySelector(".pokemon-list-container");
      container.innerHTML = "";
      pokemon.forEach((btn) => {
        container.innerHTML += `<div class="poke-btn"><button onclick="getPokemonInfo('${btn.url}')">${btn.name}</button></div>`;
      });
      container.innerHTML += `<br><br><button onclick="getPokemonList('${data.previous}')">Prev</button><button onclick="getPokemonList('${data.next}')">Next</button>`;
    });
}

getPokemonList(base_URL);

function getPokemonInfo(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector(".pokemon-info").innerHTML = `
        <img src="${data.sprites.front_default}">
        <div class="poke-info-cont">
            <h2>${data.name}</h2>
        </div>
      `;
    });
}

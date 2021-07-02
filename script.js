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
        container.innerHTML += `
        <div class="poke-btn">
          <button onclick="getPokemonInfo('${btn.url}')">${btn.name}</button>
        </div>
        `;
      });
      if (data.previous == null) {
        container.innerHTML += `<br><br><div class="fix-poke"><button class="poke-next next-1" onclick="getPokemonList('${data.next}')">Next</button></div>`;
        document.getElementsByClassName(".poke-prev").disabled = true;
      } else {
        container.innerHTML += `<br><br><button class="poke-prev prev-1" onclick="getPokemonList('${data.previous}')">Prev</button><button class="poke-next next-1" onclick="getPokemonList('${data.next}')">Next</button>`;
      }
    });
}

getPokemonList(base_URL);

function getPokemonInfo(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector(".pokemon-info").innerHTML = `
      <img class="poke-img" src="${data.sprites.other["official-artwork"].front_default}">
      <div class="poke-info-cont">
      <h2>${data.id}. ${data.name}</h2>
      <div>
      <p>Types: <span class="span-poke">${data.types[0].type.name}</span></p>
      <p>Abilities: ${data.abilities[0].ability.name}, ${data.abilities[1].ability.name}</p>
      <p>Height: ${data.height}</p>
      <p>Weight: ${data.weight}</p>
      </div>
      </div>
      `;
    });
}

const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const maxRecords = 151;
let offset = 0;
let limit = 20;

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        (pokemon) => `
          <li class="pokemon ${pokemon.type}">
            <div class="number">
              <span class="number-slot">#${pokemon.number}</span>
            </div>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
              <ol class="types">          
              ${pokemon.types
                .map((type) => `<li class='type ${type}'>${type}</li>`)
                .join("")}
              </ol>
              <img
                src="${pokemon.photo}"
                alt="${pokemon.name}">
            </div>
            <div class="stats">
              <p>Base Stats:</p>
              <ol class="stats-list">
                ${pokemon.stats
                  .map(
                    (item) =>
                      `<li class="stats-item">${
                        item.stat.name.charAt(0).toUpperCase() +
                        item.stat.name.slice(1)
                      }: ${item.base_stat}</li>`
                  )
                  .join("")}
              </ol>
            </div>
        </li>
      `
      )
      .join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const recordAmount = offset + limit;

  if (recordAmount >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

const searchForm = document.getElementById('search-form');
const pokemonInfo = document.querySelector('.pokemon-info');
const searchInput = document.getElementById('name-search');
const searchedPokemon = document.getElementById('searched-pokemon');
const searchedPokemonImg = document.getElementById('searched-pokemon-img');
const searchedPokemonType = document.getElementById('searched-pokemon-type');
const searchedPokemonAbilities = document.getElementById('searched-pokemon-abilities');
const searchedPokemonMoves = document.getElementById('searched-pokemon-moves');
const notFound = document.getElementById('not_found');
const buttonRandom = document.getElementById('fetch-random-pokemon');

function renderPokemon (data) {
    notFound.style.display = 'none';
    
    searchedPokemon.textContent = data.name.toUpperCase();

    const pokemonImg = document.createElement('img');
    if (data.sprites?.front_default) {
        pokemonImg.src = data.sprites.front_default;
    } else {
        pokemonImg.src = 'images/questionmark.png';
    }
    searchedPokemonImg.replaceChildren(pokemonImg);

    let arrOfTypes = data.types.map(element => element.type.name)
    searchedPokemonType.textContent = arrOfTypes.join(', ');

    let arrOfAbilities = data.abilities.map(element => element.ability.name)
    searchedPokemonAbilities.textContent = arrOfAbilities.join(', ');

    let arrOfMoves = data.moves.map(element => element.move.name)
    let arrOfMovesRandom = [];
    while (arrOfMovesRandom.length < 10 && arrOfMovesRandom.length < arrOfMoves.length) {
        const index = Math.floor(Math.random() * arrOfMoves.length);
        if (!arrOfMovesRandom.includes(arrOfMoves[index])) {
            arrOfMovesRandom.push(arrOfMoves[index]);
        }
    }

    const movesList = document.createElement('ul');
    arrOfMovesRandom.forEach(move => {
        const element = document.createElement('li');
        movesList.append(element);
        element.textContent = move;
    });
    searchedPokemonMoves.replaceChildren(movesList);

    pokemonInfo.style.display = 'flex';
    searchedPokemon.scrollIntoView({behavior: "smooth"});
}

function responseHandler (response, errorMessage) {
    if (response.ok) {
        return response.json()
        } else {
            throw new Error(errorMessage);
        }
}

function errorHandler (error) {
    pokemonInfo.style.display = 'none';
    notFound.textContent = error.message;
    notFound.style.display = 'block';
    notFound.scrollIntoView({behavior: "smooth"});
}

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchInputValue = searchInput.value.toLowerCase().trim();
    const searchUrl = `https://pokeapi.co/api/v2/pokemon/${searchInputValue}`;
    fetch(searchUrl)
        .then((response) => {
            return responseHandler(response, 'Pokemon not found :(');
        })
        .catch(errorHandler)
        .then(renderPokemon);
});


buttonRandom.addEventListener('click', (event) => {
    const numberOfPokemons = 898;
    const randomPokemon = Math.floor(Math.random() * numberOfPokemons);
    const randomPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${randomPokemon}`;

    fetch(randomPokemonUrl)
        .then((response) => {
            return responseHandler(response, "Something's wrong :(");
        })
    .catch(errorHandler)
    .then(renderPokemon);
});

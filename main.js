const searchForm = document.getElementById('search-form');
const pokemonInfo = document.querySelector('.pokemon-info');
const searchInput = document.getElementById('name-search');
const searchedPokemon = document.getElementById('searched-pokemon');
const searchedPokemonImg = document.getElementById('searched-pokemon-img');
const searchedPokemonType = document.getElementById('searched-pokemon-type');
const searchedPokemonAbilities = document.getElementById('searched-pokemon-abilities');
const searchedPokemonMoves = document.getElementById('searched-pokemon-moves');

function renderPokemon (data) {
    console.log(data)
    document.getElementById('not_found').style.display = 'none';
    
    searchedPokemon.textContent = data.name.toUpperCase();
    const pokemonImg = document.createElement('img');
    if (data.sprites.front_default) {
        pokemonImg.src = data.sprites.front_default;
        searchedPokemonImg.replaceChildren(pokemonImg);
    } else {
        pokemonImg.src = 'images/questionmark.png';
        searchedPokemonImg.replaceChildren(pokemonImg);
    }
    let arrOfTypes = data.types.map(element => {
        return element.type.name;
    })
    searchedPokemonType.textContent = arrOfTypes.join(', ');

    let arrOfAbilities = data.abilities.map(element => {
        return element.ability.name;
    })
    searchedPokemonAbilities.textContent = arrOfAbilities.join(', ');

    let arrOfMoves = data.moves.map(element => {
        return element.move.name;
    })
    let arrOfMovesRandom = [];
    let i = 0;
    while (i < 10 && i < arrOfMoves.length) {
        const index = Math.floor(Math.random() * arrOfMoves.length);
        if (!arrOfMovesRandom.includes(arrOfMoves[index])) {
            arrOfMovesRandom.push(arrOfMoves[index]);
            i++;
        }
    }
    const movesList = document.createElement('ul');
    for (let i = 0; i < arrOfMovesRandom.length; i++) {
        const element = document.createElement('li');
        movesList.append(element);
        element.textContent = arrOfMovesRandom[i];
    }
    searchedPokemonMoves.replaceChildren(movesList);

    pokemonInfo.style.display = 'flex';
    searchedPokemon.scrollIntoView({behavior: "smooth"});
}

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchInputValue = searchInput.value.toLowerCase().trim();
    console.log(searchInputValue);
    const searchUrl = `https://pokeapi.co/api/v2/pokemon/${searchInputValue}`;
    fetch(searchUrl)
        .then((response) => {
            if (response.ok) {
            return response.json()
            } else {
                throw new Error('Pokemon not found :(');
            }
        })
        .catch(error => {
            console.log(error.message);
            pokemonInfo.style.display = 'none';
            document.getElementById('not_found').textContent = 'Pokemon not found :(';
            document.getElementById('not_found').style.display = 'block';
            document.getElementById('not_found').scrollIntoView({behavior: "smooth"});
        })
        .then(renderPokemon);
});




const buttonRandom = document.getElementById('fetch-random-pokemon');

buttonRandom.addEventListener('click', (event) => {
    const randomPokemon = Math.floor(Math.random() * 898);
    const randomPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${randomPokemon}`;

    fetch(randomPokemonUrl).then((response) => {
        if (response.ok) {
            return response.json()
            } else {
                throw new Error("Something's wrong :(");
            }
    })
    .catch(error => {
        console.log(error.message);
        pokemonInfo.style.display = 'none';
        document.getElementById('not_found').textContent = "Something's wrong :(";
        document.getElementById('not_found').style.display = 'block';
        document.getElementById('not_found').scrollIntoView({behavior: "smooth"});
    })
    .then(renderPokemon);
});

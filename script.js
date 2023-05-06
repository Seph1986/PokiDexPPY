const translations = {
  normal: 'Normal',
  fire: 'Fuego',
  water: 'Agua',
  electric: 'Eléctrico',
  grass: 'Planta',
  ice: 'Hielo',
  fighting: 'Lucha',
  poison: 'Veneno',
  ground: 'Tierra',
  flying: 'Volador',
  psychic: 'Psíquico',
  bug: 'Bicho',
  rock: 'Roca',
  ghost: 'Fantasma',
  dragon: 'Dragón',
  dark: 'Siniestro',
  steel: 'Acero',
  fairy: 'Hada'
};

function enterPokemon(event) {
    if (event.keyCode === 13) {
      findPokemon();
    }
  }

function findPokemon () {
    let pokemonName = document.getElementById("buscador").value.toLowerCase();
    let pokemon = pokemonName
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
   
      fetch(url)
          .then(function(response) {
            if (!response.ok) {
              window.alert("Pokemon no econtrado")
              throw Error(response.statusText);
            }
            return response.json();
          })
          .then(function(data) {
            showPokemon(data);
          })
          .catch(function(error) {
            console.log(error);
          });
        }


let pokemonCount= 0;

    const showPokemon = (pokemon) => {
      if (pokemonCount < 6) {
        pokemonCount++;
        console.log(pokemon)
        
        const flex = document.querySelector('.flex');
        const template = document.querySelector('#template').content;
        const clone = template.cloneNode(true);
        const fragment = document.createDocumentFragment();
        
        clone.querySelector('.cardBodyImage').setAttribute('src', pokemon.sprites.front_default);
        clone.querySelector('.cardBodyPokemon').innerHTML = pokemon.name;
        clone.querySelector('.dexNumber').innerHTML = '#' + pokemon.id;
        clone.querySelector('.cardBottomPs h3').textContent = pokemon.stats[0].base_stat;
        clone.querySelector('.cardBottomAtk h3').textContent = pokemon.stats[1].base_stat;
        clone.querySelector('.cardBottomDef h3').textContent = pokemon.stats[2].base_stat;
        clone.querySelector('.cardBottomSpAtk h3').textContent = pokemon.stats[3].base_stat;
        clone.querySelector('.cardBottomSpDef h3').textContent = pokemon.stats[4].base_stat;
        clone.querySelector('.cardBottomSpeed h3').textContent = pokemon.stats[5].base_stat;
        const types = pokemon.types;
        if (types.length === 1) {
          const type = types[0].type.name;
          const translation = translations[type];
          clone.querySelector('.cardBodyType h3').textContent = translation;
        } else if (types.length === 2) {
          const type1 = types[0].type.name;
          const type2 = types[1].type.name;
          const translation1 = translations[type1];
          const translation2 = translations[type2];
          clone.querySelector('.cardBodyType h3').textContent = `${translation1}/${translation2}`;
        }
        
        fragment.appendChild(clone);
        flex.appendChild(fragment);
      }
    };


const resetButton = document.querySelector('.pokemonReset');

    resetButton.addEventListener('click', function() {
        const flex = document.querySelector('.flex');
        while (flex.firstChild) {
            flex.removeChild(flex.firstChild);
        }
        pokemonCount = 0;
    });

function playAudio() {
    document.getElementById("audio1").play()
    
}

const audio = document.getElementById("audio1");
let lastVolume = audio.volume;

audio.volume = 0.04;

const stopMusicButton = document.querySelector('#stopMusic');

stopMusicButton.addEventListener('click', function() {
  if (audio.volume === 0) {
      audio.volume = lastVolume;
  } else {
      lastVolume = audio.volume;
      audio.volume = 0;
  }
  stopMusicButton.classList.toggle('active');
});

const infoButton = document.getElementById("infoButton");
const popupContainer = document.getElementById("popupContainer");
const closeButton = document.getElementById("closeButton");
  
infoButton.addEventListener("click", () => {
    popupContainer.style.display = "block";
  });
  

closeButton.addEventListener("click", () => {
    popupContainer.style.display = "none";
  });
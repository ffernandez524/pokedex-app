//Pokemon class template
let pokemon = {
    //String
    name: '',
    //API Url for pokemon
    detailsUrl: ''
};

//Pokemon Repository wrapped in IIFE
let pokemonRepository = (function () {
    //Array that holds Pokemon Objects
    let pokemonList = [];
    //Pokemon API to retrieve data from
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //Get Pokemon List Array
    function getAll () {
        return pokemonList;
    }
    
    function addListItem(pokemon) {
        let documentList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        
        button.classList.add('pokemon-button');
        button.innerText = pokemon.name;
        buttonClick(button, pokemon);        

        listItem.appendChild(button);
        documentList.appendChild(listItem);
    }

    function loadList(){
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails (item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function buttonClick(button, pokemon) {
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    //Add Pokemon Objects to Array
    function add (item) {
        //Make sure item is an object
        if(typeof(item) === 'object') {
            //If an Object, compare keys in it to pokemon template
            let addedKeys = Object.keys(item);
            let templateKeys = Object.keys(pokemon);

            //Compare number of keys to template
            if( addedKeys.length === templateKeys.length ) {            
                //Compare key names
                let i = 0;
                //Changed to true if testing passes
                let success = false;

                //Loop through addedKeys comparing each key to the template
                addedKeys.forEach(function(key) {
                    if(key !== templateKeys[i]) {
                        //Key does not match template; exit loop
                        console.log('pokemonRepository.add error: key does not match template: ' + key);
                        return;
                    } else { 
                        i++;
                        //Last run of loop, set success variable to true
                        if((addedKeys.length) === i) { 
                            success = true; 
                        }
                    }
                });
                //If loop processed without issue, add the pokemon to the list!
                if (success) { pokemonList.push(item); }

            //Key number does not match pokemon template
            } else {
                console.log('pokemonRepository.add error: number of keys does not match template');
            }
        //Item is not an object    
        } else {
            console.log('pokemonRepository.add error: not an object, item is type: ' + typeof(item));
        }        
    }

    return {
        getAll: getAll,
        addListItem: addListItem,
        add: add,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    }
})();

pokemonRepository.loadList().then(function() {
    //Write each pokemon in the repository
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon); 
    });

});
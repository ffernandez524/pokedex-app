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
    
    //Add a button for each pokemon in the retrieved list
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

    //Loads a list of pokemon from the Online API 
    function loadList(){
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    //Load details of pokemon from online API after user clicks on a button
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

    //Used by showDetails modal function to close/hide the modal
    function hideModal () {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }


    function buttonClick(button, pokemon) {
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            let modalContainer = document.querySelector('#modal-container');
      
            //Clear all existing modal content
            modalContainer.innerHTML = '';
      
            let modal = document.createElement('div');
            modal.classList.add('modal');
        
            //Add the new modal content
            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = 'Close';
            closeButtonElement.addEventListener('click', hideModal);
          
            let titleElement = document.createElement('h1');
            titleElement.innerText = pokemon.name;
            
            //Display image of pokemon
            let imageElement = document.createElement('img');
            imageElement.src = pokemon.imageUrl;
            imageElement.innerText = pokemon.name;

            //Display description of pokemon
            let contentElement = document.createElement('p');
            contentElement.innerText = pokemon.name + ' is ' + pokemon.height + ' feet tall!\n';
            
            //Add new elements to container
            modal.appendChild(closeButtonElement);
            modal.appendChild(titleElement);
            modal.appendChild(imageElement);
            modal.appendChild(contentElement);
            modalContainer.appendChild(modal);
            
            //Close modal if clicked outside of container
            modalContainer.addEventListener('click', (e) => {
                let target = e.target;
                if (target === modalContainer) {
                    hideModal();
                }
            });

            //Press Escape to hideModal
            window.addEventListener('keydown', (e) => {
                let modalContainer = document.querySelector('#modal-container');
                if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                    hideModal();
                }
            });
            modalContainer.classList.add('is-visible');
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
        loadDetails: loadDetails,
        hideModal: hideModal,
    }
})();

pokemonRepository.loadList().then(function() {
    //Write each pokemon in the repository
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon); 
    });

});

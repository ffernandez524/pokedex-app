//Pokemon class
let pokemon = {
    //String
    name: '',
    //Number: Height in feet rounded to 10's (Ex: 5.11)
    height: 0,
    //Array of Strings that hold each type the pokemon has
    types: ''
};

//Pokemon Repository wrapped in IIFE
let pokemonRepository = (function () {
    //Array that holds Pokemon Objects
    let pokemonList = [];

    //Get Pokemon List Array
    function getAll () {
        return pokemonList;
    }
    //Add Pokemon Objects to Array
    function add (item) {
        pokemonList.push(item);
    }

    return {
        getAll: getAll,
        add: add
    }
})();

//Add Pokemon to pokemonRepository
pokemonRepository.add( { name: 'Zigzagoon', height: 1.04, types : ['Normal'] } );
pokemonRepository.add( { name: "Farfetch'd", height: 2.07, types: ['Normal', 'Flying'] } );
pokemonRepository.add( { name: 'Psyduck', height: 2.07, types: ['Water'] } );
pokemonRepository.add( { name: 'Snorlax', height: 6.11, types: ['Normal'] } );

//Write each pokemon in the repository
pokemonRepository.getAll().forEach(function(pokemon) {
    document.write('A wild ' + pokemon.name + ' has appeared! It is ' + pokemon.height + ' feet tall!');

    if (pokemon.height > 3) {
        document.write(' Wow, that\'s big!<br>');
    } else {
        document.write('<br>');
    }
});
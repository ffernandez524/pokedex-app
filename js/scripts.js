//Pokemon class template
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
        add: add
    }
})();

//Add Pokemon to pokemonRepository
pokemonRepository.add( { name: 'Zigzagoon', height: 1.04, types : ['Normal'] } );
pokemonRepository.add( { name: "Farfetch'd", height: 2.07, types: ['Normal', 'Flying'] } );
pokemonRepository.add( { name: 'Psyduck', height: 2.07, types: ['Water'] } );
pokemonRepository.add( { name: 'Snorlax', height: 6.11, types: ['Normal'] } );

//Write each pokemon in the repository
pokemonRepository.getAll().forEach(function(mon) {
    document.write('A wild ' + mon.name + ' has appeared! It is ' + mon.height + ' feet tall!');

    if (mon.height > 3) {
        document.write(' Wow, that\'s big!<br>');
    } else {
        document.write('<br>');
    }
});
//Pokemon class
let pokemon = {
    //String
    name: '',
    //Number: Height in feet rounded to 10's (Ex: 5.11)
    height: 0,
    //Array of Strings that hold each type the pokemon has
    types: ''
};

//Array of Pokemon objects
let pokemonList = [];

//Add 3 pokemon to array
pokemonList.push(
    { name: 'Zigzagoon', height: 1.04, types : ['Normal'] },
    { name: "Farfetch'd", height: 2.07, types: ['Normal', 'Flying'] },
    { name: 'Psyduck', height: 2.07, types: ['Water'] },
    { name: 'Snorlax', height: 6.11, types: ['Water'] }
);

for (i = 0; i < pokemonList.length; i++) {
    document.write('A wild ' + pokemonList[i].name + ' has appeared! It is ' + pokemonList[i].height + ' feet tall!');
    if (pokemonList[i].height > 5) {
        document.write(' Wow, that\'s big!<br>');
    } else {
        document.write('<br>');
    }
}
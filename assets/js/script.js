/* ---------------------------------------------- Navigation bar --------------------------- */
/**
 * A function to toggle between class
 * for responsive navigation bar
 * 
 */
function toggleGameMenu(menu) {
    this.classList.toggle('open')
};

let menuButton = document.getElementById('icon-game');
menuButton.addEventListener('click', toggleGameMenu)

/* ---------------------------------------------- The Schulte Table --------------------------- */
/* Player Data */

let playerData = {
    name: 'Sophia',
    age: '',
    
}

/* -------------------------------------------- Name of player ------------- */
/* to show name of player in all pages and nav bar */
let playerName = document.getElementsByClassName('player-name');
for(player of playerName) {
    /* player-name is the class of each container to show tha name of the player */
    //console.log(player.innerHTML);
    //console.log(playerData.name);
    player.innerHTML = playerData.name;  
}
/* ------------------------------------------- */

/* Play game Data */
let playGame = {
    dateToday: new Date(),
    tableCells: '',
    numData: [ ],
    newNumData: [ ],
    answerNum: [ ],
    selectedNum: [ ],
}

console.log(playGame.dateToday.toDateString()); // to show date of today
document.getElementById('dateToday').textContent += playGame.dateToday.toDateString();

let timer = {
    minute: document.getElementById('minute').textContent,
    seconds: document.getElementById('seconds').textContent,
    milliseconds: document.getElementById('milliseconds').textContent,
}

//console.log(`${timer.minute}:${timer.seconds}:${timer.milliseconds}`);

/* ------------------------------------------- GAME ------------------------------- */
/* Get the tablecells */
playGame.tableCells = document.getElementsByClassName('cell');
console.log(`This is the total number of cells: ${playGame.tableCells.length}`);




// shuffle function
//


//GET THE CELLS BY FOR LOOP TO START 

//LOOP THROGHT THE LENGTH OF TABLE DATA TO GET LENGTH
//answernum

//checkNum
// settimer

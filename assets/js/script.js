// From other source
/**
 * A function to toggle between class
 * for responsive navigation bar
 * 
 */
function toggleGameMenu(menu) {
    this.classList.toggle('open')
};

let menuButton = document.getElementById('icon-game');
menuButton.addEventListener('click', toggleGameMenu);

//---- To display home and table section
// Based on external source. Changed some code on my own
let playButton = document.getElementById('btn-play');
let homeButton = document.getElementById('home-button');
let homeSection = document.getElementById('home-section');
let tableSection = document.getElementById('table-section');

playButton.addEventListener('click', displayGame);
homeButton.addEventListener('click', displayHome);

function displayGame() {
    tableSection.classList.add('active');
    homeSection.classList.add('not-active');
}

function displayHome() {
    tableSection.classList.remove('active');
    homeSection.classList.remove('not-active');
}

// ---- Form pop up
// Based on external source. Changed some code
let openForm = document.getElementById('player-btn');
let playerForm = document.getElementById('player-form')
let overlay = document.getElementById('overlay');

let closeForm = document.getElementById('close-button');

openForm.addEventListener('click', openPlayerForm);
closeForm.addEventListener('click', closePlayerForm);

function openPlayerForm() {
    playerForm.classList.add('active');
    overlay.classList.add('active');
}

function closePlayerForm() {
    playerForm.classList.remove('active');
    overlay.classList.remove('active');
}

//---- Form
let formTable = document.getElementById('table-form');
formTable.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    
    
    
    console.log(playerData.name);
    formTable.submit();
}


/* Player Data */
let playerData = {
    name: 'Sophia',
    birthYear: '',
    currentYear: '',
    age: '',
}

let localPlayerData = JSON.stringify(playerData);
console.log(localPlayerData);
localStorage.setItem('playerData', localPlayerData);
// Own code
/* to show name of player in all pages and nav bar */
let playerName = document.getElementsByClassName('player-name');
for(player of playerName) {
    /* player-name is the class of each container to show tha name of the player */
    player.innerHTML = playerData.name;  
    
}

/* Play game Data */
let playGame = {
    dateToday: new Date(),
    tableCells: '',
    numData: [ ],
    shuffleNumData: [ ],
    answerNum: [ ],
    selectedNum: [ ],
    currentSelectedNum: '',
}

// Own code
console.log(playGame.dateToday.toDateString()); // to show date of today
function displayDate() {
    document.getElementById('dateToday').textContent += playGame.dateToday.toDateString();
}
displayDate();


/**
 * A function to assign numbers to each table cell according
 * to the total number of cells in the table
 */
function pushCellData() {
    /* Get the tablecells */
    playGame.tableCells = document.getElementsByClassName('cell');
    console.log(`This is the total number of cells: ${playGame.tableCells.length}`);
    
    //set the number for the table cells by getting the length of the tablecells
    for(let i = 1; i < playGame.tableCells.length + 1; i++) {
        playGame.numData.push(i)
    }
}

// shuffle function from geek for geeks tutorials
/**
 * Function to shuffle array of
 * numbers
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let k = array[i];
        array[i] = array[j];
        array[j] = k;
    }
    return array;
}

// Based on Anton Kalinin Codepen
/**
 * Function to check if the clicked number
 * is the right sequence of numbers in ascending order
 */
function checkNumber() {
    //1- get each click
    let len = playGame.tableCells.length - 1;
    for (let i = playGame.tableCells.length - len; i > 0; i--) {
        playGame.currentSelectedNum = this.innerHTML;
        console.log(playGame.currentSelectedNum);

        //2 - check if a number is clicked again
        if (playGame.selectedNum.includes(parseInt(playGame.currentSelectedNum))) {
            continue;
        }

        //3 - assign all clicked numbers to selectedNum
        playGame.selectedNum.push(parseInt(playGame.currentSelectedNum));
        console.log(playGame.selectedNum);
        
        //4 - Checking if its correct number or incorrect
        if (playGame.answerNum[playGame.selectedNum.indexOf(parseInt(playGame.currentSelectedNum))] 
        === parseInt(playGame.currentSelectedNum) && 
        playGame.selectedNum.includes(parseInt(playGame.currentSelectedNum))) {
            console.log(`It's correct`);
            this.style.background = 'var(--green)'
        } else {
            playGame.answerNum.splice(0, 0, playGame.selectedNum.indexOf(parseInt(playGame.currentSelectedNum)));
            playGame.answerNum = playGame.answerNum.filter(numb => numb !== parseInt(playGame.currentSelectedNum));
            console.log(`It's incorrect`);
            this.style.background = 'var(--red)';
        }

        if (playGame.selectedNum.indexOf(parseInt(playGame.currentSelectedNum)) + 1 === playGame.tableCells.length) {
            endGame();
            clearData();
            document.getElementById('start').textContent = `Start again?`;
        }
    }
}

// Based on Anton Kalinin Codepen
/**
 * To start the game
 */
function gameStart() {
    pushCellData();
    playGame.shuffleNumData = shuffleArray(playGame.numData);
    //GET THE CELLS THROUGH FOR LOOP AND ASSIGN THE SHUFFLED NUMBER
    for (let i = 0; i < playGame.tableCells.length; i++) {
        playGame.tableCells[i].style.background = 'var(--transparent-white)';
        playGame.tableCells[i].innerHTML = playGame.shuffleNumData[i];
        //ADD EVENTLISTENER TO EACH TABLECELLS
        playGame.tableCells[i].addEventListener('click', checkNumber)
    }
    
    //Set the answerNum for comparison to get the right sequence of numbers
    //by arranging them in ascending order using sort()
    //from W3 Schools Sort array
    playGame.answerNum = playGame.shuffleNumData.sort(function(a, b){return a - b})
    document.getElementById('stop').disabled = false;
    document.getElementById('stop').style.background = 'var(--red)';
    document.getElementById('start').disabled = true;
    document.getElementById('start').style.background = 'none';

    document.getElementById('center-cell').style.border = '2px solid var(--blue)';
}

//own code
/**
 * Function to reset data from the start
 */
function clearData() {
    for (let i = 0; i < playGame.tableCells.length; i++) {
        playGame.tableCells[i].innerHTML = '';
        playGame.tableCells[i].style.background = 'var(--transparent-white)';

        playGame.numData = [ ];
        playGame.shuffleNumData = [ ];
        playGame.answerNum = [ ];
        playGame.selectedNum = [ ];
        playGame.currentSelectedNum = '';
    }
    document.getElementById('stop').style.background = 'initial';
    document.getElementById('start').style.background = 'var(--green)';
    document.getElementById('center-cell').style.border = 'none';

}


// ---- set timer
//dev.to Walter Nascimento
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

document.getElementById('start').addEventListener('click', start);
document.getElementById('stop').addEventListener('click', stop);

//dev.to Walter Nascimento
/**
 * Callback function for the start button
 */
function start() {
    cron = setInterval(() => { tableTimer(); }, 10);
    gameStart();
    document.getElementById('finish-msg').innerHTML = ``;
}

//dev.to Walter Nascimento
/**
 * Callback function for the stop button
 */
function stop() {
    clearInterval(cron);
    minute = 0;
    second = 0;
    millisecond = 0;

    clearData();

    let min = document.getElementById('minute').innerText;
    let sec = document.getElementById('seconds').innerText;
    document.getElementById('finish-msg').innerHTML = `Game stopped at ${min} min and ${sec} sec!`;
    document.getElementById('minute').innerText = '00';
    document.getElementById('seconds').innerText = '00';
    document.getElementById('milliseconds').innerText = '00';
    alert(`Oops! you stopped`);

    document.getElementById('stop').disabled = true;
    document.getElementById('start').disabled = false;

}

//Own code
/**
 * Function to be executed when the game ends
 */
function endGame() {
    clearInterval(cron);
    let min = document.getElementById('minute').innerText;
    let sec = document.getElementById('seconds').innerText;

    document.getElementById('finish-msg').innerHTML = `You finished for ${min} min and ${sec} sec!`
    alert('finished');

    document.getElementById('stop').disabled = true;
    document.getElementById('start').disabled = false;

}

//dev.to Walter Nascimento
/**
 * Timer function
 */
function tableTimer() {
    if ((millisecond += 10) === 1000) {
        millisecond = 0;
        second++;
    }
    if (second === 60) {
        second = 0;
        minute++;
    }
    document.getElementById('minute').innerText = returnData(minute);
    document.getElementById('seconds').innerText = returnData(second);
    document.getElementById('milliseconds').innerText = returnData(millisecond);
}

//dev.to Walter Nascimento
/**
 * Function to add zero to timer when
 * the number is below 10
 */
function returnData(time) {
    return time > 10 ? time : `0${time}`;
}

// ===================== open modal
/* const openPlayerForm = document.querySelectorAll('data-modal-target');
const closePlayerForm = document.querySelectorAll('data-close-button');
const overlay = document.getElementById('overlay');

openPlayerForm.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(a.dataset.modalTarget);
        openForm(modal)
    })
})

closePlayerForm.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.player-form');
        closeForm(modal)
    })
})

function openForm(modal) {
    if (modal == null) {
        return;
    }
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeForm(modal) {
    if (modal == null) {
        return;
    }
    modal.classList.remove('active');
    overlay.classList.remove('active');
} */

//-----


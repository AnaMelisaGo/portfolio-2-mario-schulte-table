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
    player.innerHTML = playerData.name;  
}
/* ------------------------------------------- */

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

console.log(playGame.dateToday.toDateString()); // to show date of today
document.getElementById('dateToday').textContent += playGame.dateToday.toDateString();

/* ------------------------------------------- GAME ------------------------------- */
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

//LOOP THROUGH THE TABLE CELLS TO GET EACH MOUSE CLICK
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
        }
    }
}

/* --------------------------------------------------------game start------- */
function gameStart() {
    pushCellData();
    playGame.shuffleNumData = shuffleArray(playGame.numData);
    //GET THE CELLS THROUGH FOR LOOP AND ASSIGN THE SHUFFLED NUMBER
    for (let i = 0; i < playGame.tableCells.length; i++) {
        playGame.tableCells[i].innerHTML = playGame.shuffleNumData[i];
        //ADD EVENTLISTENER TO EACH TABLECELLS
        playGame.tableCells[i].addEventListener('click', checkNumber)
    }
    
    //Set the answerNum for comparison to get the right sequence of numbers
    //by arranging them in ascending order using sort()
    //from W3 Schools Sort array
    playGame.answerNum = playGame.shuffleNumData.sort(function(a, b){return a - b})
    console.log(playGame.answerNum);
}

// set timer
//dev.to Walter Nascimento
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

document.getElementById('start').addEventListener('click', start);
document.getElementById('stop').addEventListener('click', stop);

function start() {
    cron = setInterval(() => { tableTimer(); }, 10);
    gameStart();
    document.getElementById('finish-msg').innerHTML = ``;
}

function stop() {
    clearInterval(cron);
    minute = 0;
    second = 0;
    millisecond = 0;


    for (let i = 0; i < playGame.tableCells.length; i++) {
        playGame.tableCells[i].innerHTML = '';
        playGame.tableCells[i].style.background = 'var(--transparent-white)';
        console.log(playGame.tableCells[i]);

        playGame.numData = [ ];
        playGame.shuffleNumData = [ ];
        playGame.answerNum = [ ];
        playGame.selectedNum = [ ];
        playGame.currentSelectedNum = '';
        console.log(playGame.tableCells, playGame.numData, playGame.shuffleNumData );
    }

    let min = document.getElementById('minute').innerText;
    let sec = document.getElementById('seconds').innerText;
    document.getElementById('finish-msg').innerHTML = `Oops! You stopped at ${min} and ${sec}!`;
    document.getElementById('minute').innerText = '00';
    document.getElementById('seconds').innerText = '00';
    document.getElementById('milliseconds').innerText = '00';
    alert(`Oops! you stopped`);
}

function endGame() {
    clearInterval(cron);
    let min = document.getElementById('minute').innerText;
    let sec = document.getElementById('seconds').innerText;

    document.getElementById('finish-msg').innerHTML = `You finished for ${min} min and ${sec} sec!`
    alert('finished');
}

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

function returnData(time) {
    return time > 10 ? time : `0${time}`;
}
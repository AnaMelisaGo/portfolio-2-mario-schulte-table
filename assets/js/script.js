// ------------------------------------------------ FUNCTIONS --------------------------------------
/**
 * A function to toggle between class
 * for responsive navigation bar
 * 
 * From JavaScript Academy Tutorial for Responsive navbar
 * https://youtu.be/OjQP7rPwJyE
 */
function toggleGameMenu(menu) {
    this.classList.toggle('open');
}

/**
 * Function to display Game Table when Play button is clicked
 * Based on Web Dev Simplified Tutorial
 * How to build a pop up with JavaScript
 * https://youtu.be/MBaw_6cPmAw
 */
function displayGame() {
    tableSection.classList.add('active');
    homeSection.classList.add('not-active');
    displayDate();
    showPlayerName();
}

/**
 * Function to display Home section when the heading is clicked
 * Based on Web Dev Simplified Tutorial
 * How to build a pop up with JavaScript
 * https://youtu.be/MBaw_6cPmAw
 */
function displayHome() {
    tableSection.classList.remove('active');
    homeSection.classList.remove('not-active');
    playerInfo.classList.remove('active');
}

/**
 *  Function to focus on Name input field
 *  From geeks for geeks
 *  https://www.geeksforgeeks.org/set-the-focus-to-html-form-element-using-javascript/
 */
function focusPlayerName() {
    namePlayer.focus();
}

/**
 *  Function to display form when Create Player button is clicked
 * Based on Web Dev Simplified Tutorial
 * How to build a pop up with JavaScript
 * https://youtu.be/MBaw_6cPmAw
 */
function openPlayerForm() {
    playerForm.classList.add('active');
    overlay.classList.add('active');
    focusPlayerName();
}

/**
 * Function to close form when the X button is clicked
 * Based on Web Dev Simplified Tutorial
 * How to build a pop up with JavaScript
 * https://youtu.be/MBaw_6cPmAw
 */
function closePlayerForm() {
    playerForm.classList.remove('active');
    overlay.classList.remove('active');
}

/**
 *  Function for submit button to store all player's data to local storage
 *  Based on dcode Tutorial how to use Local Storage to store the player data
 *  https://youtu.be/k8yJCeuP6I8
 */
function handleSubmit() {
    let name = namePlayer.value;
    let year = birthYear.value;
    console.log(name);
    
    if (localStorage.getItem('Name') && localStorage.getItem('Birthyear') !== null) {
        alert('A player is already logged. Remove existing player before you create a new player.');
    } else {
        localStorage.setItem('Name', name);
        localStorage.setItem('Birthyear', year);
    }
}

/**
 * Function to show the player's name in the webpage
 * Own code
 */
function showPlayerName() {
    for(let player of playerName) {
        // player-name is the class of each container to show tha name of the player
        if (localStorage.getItem('Name') !== null) {
            player.innerHTML = localStorage.getItem('Name');  
            console.log(player.innerHTML);
        } else {
            player.innerHTML = 'Player';
        }
    }
}

/**
 * Function to calculate the age of the player
 * Own code
 */
function calcAge() {
    return currentYear - playerBirthyear;
}

/**
 * Function to show players age
 * Own code
 */
function showPlayerAge() {
    if (playerBirthyear === null) {
        playerAge.textContent = `Age: ?`;
    } else {
        playerAge.textContent = `Age: ${calcAge()} years old`;
    }
}

/**
 *  Function to show the player info section
 *  Own code
 */
function showPlayerInfo() {
    console.log('Hello');
    playerInfo.classList.add('active');
    homeSection.classList.add('not-active');
    tableSection.classList.remove('active');
    showPlayerName();
    showPlayerAge();
    displayTimeFinish();
}

/**
 *  Function to delete the players data from the local storage
 *  Own code
 */
function clearStorage() {
    localStorage.clear();
    location.reload();
}

/**
 *  Function to display date in the gaming section
 *  Own code
 */
function displayDate() {
    document.getElementById('dateToday').textContent += playGame.dateToday.toDateString();
}

/**
 * Timer function
 * Walter Nascimento
 * https://dev.to/walternascimentobarroso/creating-a-timer-with-javascript-8b7
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

/**
 * Function to add zero to timer when the number is below 10
 * Walter Nascimento
 * https://dev.to/walternascimentobarroso/creating-a-timer-with-javascript-8b7
 */
function returnData(time) {
    return time > 10 ? time : `0${time}`;
}

/**
 * A function to assign numbers to each table cell according to the total number of cells in the table
 * Own code
 */
function pushCellData() {
    // Get the tablecells
    playGame.tableCells = document.getElementsByClassName('cell');
    console.log(`This is the total number of cells: ${playGame.tableCells.length}`);
    
    //set the number for the table cells by getting the length of the tablecells
    for(let i = 1; i < playGame.tableCells.length + 1; i++) {
        playGame.numData.push(i);
    }
}

/**
 * Function to shuffle array of numbers
 * geek for geeks tutorials
 * https://www.geeksforgeeks.org/how-to-shuffle-an-array-using-javascript/
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

/**
 * Function to check if the clicked number is the right sequence of numbers in ascending order
 * Based on Anton Kalinin Codepen
 * https://codepen.io/ssh
 */
function checkNumber() {
    //1- get each click
    let len = playGame.tableCells.length - 1;
    for (let i = playGame.tableCells.length - len; i > 0; i--) {
        playGame.currentSelectedNum = this.innerHTML;
        console.log(playGame.currentSelectedNum);

        //2 - ignores number if number is clicked again
        if (playGame.selectedNum.includes(parseInt(playGame.currentSelectedNum))) {
            continue;
        }

        //3 - assign all clicked numbers to selectedNum variable
        playGame.selectedNum.push(parseInt(playGame.currentSelectedNum));
        
        //4 - Checking if it's the correct number or not
        if (playGame.answerNum[playGame.selectedNum.indexOf(parseInt(playGame.currentSelectedNum))] === parseInt(playGame.currentSelectedNum) && 
        playGame.selectedNum.includes(parseInt(playGame.currentSelectedNum))) {
            console.log(`It's correct`);
            this.style.background = 'var(--green)';
            playGame.correctNum.push(this.innerHTML);
            console.log(playGame.correctNum);
        } else {
            playGame.answerNum.splice(0, 0, playGame.currentSelectedNum);
            playGame.answerNum = playGame.answerNum.filter(numb => numb !== parseInt(this.innerHTML));
            console.log(`It's incorrect`);
            this.style.background = 'var(--red)';
        }

        // 5 - When clicked the last table cell
        if (playGame.selectedNum.indexOf(parseInt(playGame.currentSelectedNum)) + 1 === playGame.tableCells.length) {
            endGame();
            startButton.textContent = `Start again?`;
        }
    }
}

/**
 * Function to start the game
 * Based on Anton Kalinin Codepen
 * Changed some code for the game
 */
function gameStart() {
    pushCellData();
    playGame.shuffleNumData = shuffleArray(playGame.numData);
    // Get the cells using FOR LOOP and assign the shuffled number
    // From geeks for geeks on how to shuffle an array of numbers
    for (let i = 0; i < playGame.tableCells.length; i++) {
        playGame.tableCells[i].style.background = 'var(--transparent-white)';
        playGame.tableCells[i].innerHTML = playGame.shuffleNumData[i];
        playGame.tableCells[i].addEventListener('click', checkNumber);
    }
    
    // Set the answerNum to get the right sequence of numbers by arranging them in ascending order using sort()
    // And then compare it to the numbers clicked stored in selectedNum
    // from W3 Schools Sort array
    playGame.answerNum = playGame.shuffleNumData.sort(function(a, b) {
            return a - b;
    });

    // From codegrepper.com, to disable and remove disable attribute
    stopButton.disabled = false;
    startButton.disabled = true;
    stopButton.style.background = 'var(--red)';
    startButton.style.background = 'none';
    document.getElementById('center-cell').style.border = '4px solid var(--blue)';
}

/**
 * Function to reset data from the start
 * Own code
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
        playGame.correctNum = [ ];
    }
    stopButton.style.background = 'initial';
    startButton.style.background = 'var(--green)';
    document.getElementById('center-cell').style.border = 'none';
}

/**
 * Callback function for the start button
 * Based on Walter Nascimento
 * https://dev.to/walternascimentobarroso/creating-a-timer-with-javascript-8b7
 */
function start() {
    clearData();
    cron = setInterval(() => { tableTimer(); }, 10);
    gameStart();

    finishMsg.innerHTML = '';
}

/**
 * Callback function for the stop button
 * Based on Walter Nascimento
 * https://dev.to/walternascimentobarroso/creating-a-timer-with-javascript-8b7
 */
function stop() {
    clearInterval(cron);
    minute = 0;
    second = 0;
    millisecond = 0;
    
    let min = document.getElementById('minute').innerText;
    let sec = document.getElementById('seconds').innerText;
    min = '00';
    sec = '00';
    document.getElementById('milliseconds').innerText = '00';
    finishMsg.innerHTML = `Game stopped at ${min} min and ${sec} sec!`;
    alert(`Oops! you stopped the game!`);

    clearData();

    stopButton.disabled = true;
    startButton.disabled = false;
}

/**
 * Function to be executed when the game ends
 * Own code
 */
function endGame() {
    clearInterval(cron);
    
    let min = document.getElementById('minute').innerText;
    let sec = document.getElementById('seconds').innerText;
    let correctNumb = playGame.correctNum.length;
    let date = document.getElementById('dateToday').textContent;
    localStorage.setItem('Minutes', min);
    localStorage.setItem('Seconds', sec);
    localStorage.setItem('Correct', correctNumb);
    localStorage.setItem('Date', date);

    finishMsg.innerHTML = `${correctNumb} correct numbers`;
    alert(`Finished game for ${min} min and ${sec} sec!`);
    stopButton.disabled = true;
    startButton.disabled = false;
    startButton.style.background = 'var(--green)';
    stopButton.style.background = 'initial';
}

/**
 * Function to get the minutes and seconds stored in local storage and display them in player's info section
 * Own code
 */
function displayTimeFinish(){
    playDate.textContent = `${localStorage.getItem('Date')}`;
    playMessage.textContent = `Finished for ${localStorage.getItem('Minutes')} : ${localStorage.getItem('Seconds')}`;
    playCorrect.textContent = `${localStorage.getItem('Correct')} correct numbers!`;
}

/**
 * Function for the animation of the exit button when mouse is over
 * Own code
 */
function openDoor() {
    doorClose.classList.add('not-active');
    doorOpen.classList.remove('not-active');
}

/**
 * Function for the animation of the exit button when mouse is out
 * Own code
 */
function closeDoor() {
    doorClose.classList.remove('not-active');
    doorOpen.classList.add('not-active');
}

// ------------------------------------------------ VARIABLES --------------------------------------
// Nav bar
let menuButton = document.getElementById('icon-game');

//home and table section
let playButton = document.getElementById('btn-play');
let homeButton = document.getElementById('home-button');
let homeSection = document.getElementById('home-section');
let tableSection = document.getElementById('table-section');

// Form
let openForm = document.getElementById('player-btn');
let playerForm = document.getElementById('player-form');
let overlay = document.getElementById('overlay');
let closeForm = document.getElementById('close-button');

// Form to local storage
let formTable = document.getElementById('table-form');
let namePlayer = document.getElementById('name');
let birthYear = document.getElementById('birth-year');
let playerName = document.getElementsByClassName('player-name');

// Player info section
let navPlayerButton = document.getElementById('nav-player');
let smallPlayerButton = document.getElementById('small-player');
let playerInfo = document.getElementById('player-info');
let removePlayer = document.getElementById('remove-player-icon');   // The recycle bin

// Timer
let minute = 0;
let second = 0;
let millisecond = 0;
let cron;

// Play game Data
let playGame = {
    dateToday: new Date(),
    tableCells: '',
    numData: [ ],
    shuffleNumData: [ ],
    answerNum: [ ],
    selectedNum: [ ],
    currentSelectedNum: '',
    correctNum: [ ],
};

// Start and stop button
let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
let finishMsg = document.getElementById('finish-msg');

// date, local storage and age
let playDate = document.getElementById('play-date');
let playMessage = document.getElementById('play-msg');
let playCorrect = document.getElementById('play-correct');
let playerAge = document.getElementById('player-age');
let currentYear = playGame.dateToday.getFullYear();
let playerBirthyear = localStorage.getItem('Birthyear');

// exit button
let exitGame = document.getElementById('exit-game');
let doorClose = document.getElementById('door-close');
let doorOpen = document.getElementById('door-open');

// ------------------------------------------------ EVENT LISTENERS --------------------------------------
showPlayerName();
menuButton.addEventListener('click', toggleGameMenu);

playButton.addEventListener('click', displayGame);
homeButton.addEventListener('click', displayHome);

openForm.addEventListener('click', openPlayerForm);
closeForm.addEventListener('click', closePlayerForm);

formTable.addEventListener('submit', handleSubmit);

navPlayerButton.addEventListener('click', showPlayerInfo);
smallPlayerButton.addEventListener('click', showPlayerInfo);
removePlayer.addEventListener('click', clearStorage);

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);

exitGame.addEventListener('mouseover', openDoor);
exitGame.addEventListener('mouseout', closeDoor);
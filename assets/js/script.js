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
let playerData = {
    name: 'Papa'
}

let playerName = document.getElementsByClassName('player-name');
for(player of playerName) {
    
    console.log(player.innerHTML);
    console.log(playerData.name);
    player.innerHTML = playerData.name;
}
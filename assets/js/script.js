/*Game menu toggle*/
function toggleGameMenu(menu) {
    this.classList.toggle('open')
};

let menuButton = document.getElementById('icon-game');
menuButton.addEventListener('click', toggleGameMenu)


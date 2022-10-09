/*----- constants -----*/
const words = ['DREAMWORKS', 'EDDIE MURPHY', 'THE MUFFIN MAN', 'PINOCCHIO', 'SHREK IS LOVE', 'SHREK IS LIFE', 'LORD FARQUAD', 'DONKEY', 'PRINCESS FIONA', 'PUSS IN BOOTS', 'FAR FAR AWAY', 'SHREK FOREVER AFTER', 'CAMERON DIAZ', 'MIKE MYERS', 'OGRES ARE LIKE ONIONS'];
const MAX_NUM_CHANCES = 6;

/*----- state variables -----*/
let rndWord;
let correctL;
let wrongL;
let winner;

/*----- cached elements  -----*/
const messageEl = document.querySelector('h2');
const letterEl = document.querySelectorAll('#letter');
const playAgainBtn = document.querySelector('#replay');
const guessEl = document.getElementById('guess');

/*----- event listeners -----*/
document.querySelector('#letter').addEventListener('click', letterClick);
playAgainBtn.addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
  rndWord = Math.floor(Math.random() * words.Length);
  correctL = '';
  wrongL = '';
  winner = null;
  render();
}

function letterClick(evt) {
  const letter = evt.target.innerText;
  if (
    letter !== 'BUTTON' ||
    correctL.includes(letter) ||
    wrongL.includes(letter) ||
    winner) return;
  
    winner = getWinner();
}

function getWinner() {
  if (rndWord === correctL) {
    return 'W';
  } else if (wrongL === MAX_NUM_CHANCES) {
    return 'L';
  } else {
    return null;
  }
}

function render() {
  renderLetterColor();
  renderMessage();
  renderControls();
}

function renderLetterColor() {
  
}

function renderMessage() {
  if (winner) {
    messageEl.innerText = 'WOW!! CONGRATS ON GUESSING THE RIGHT WORD!';
  } else if (MAX_NUM_CHANCES < wrongL.length) {
    messageEl.innerText = 'OOPS, GAME OVER! GINGY IS BROKEN 😭 TRY AGAIN!';
  } else {
    messageEl.innerHTML == `${MAX_NUM_CHANCES - wrongL.length} CHANCES LEFT`
  }
}

function renderControls() {
  playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
}
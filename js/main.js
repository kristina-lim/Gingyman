/*----- constants -----*/
const words = ['DREAMWORKS', 'EDDIE MURPHY', 'THE MUFFIN MAN', 'PINOCCHIO', 'SHREK IS LOVE', 'SHREK IS LIFE', 'LORD FARQUAD', 'DONKEY', 'PRINCESS FIONA', 'PUSS IN BOOTS', 'FAR FAR AWAY', 'SHREK FOREVER AFTER', 'CAMERON DIAZ', 'MIKE MYERS', 'OGRES ARE LIKE ONIONS'];
const MAX_NUM_CHANCES = 6;

/*----- state variables -----*/
let rndWord;
let guessL;
let wrongL;
let winner;

/*----- cached elements  -----*/
const messageEl = document.querySelector('h2');
const guessEl = document.querySelector('guess');
const letterEl = document.querySelector('#letter');
const playAgainBtn = document.querySelector('#replay');

/*----- event listeners -----*/
document.querySelector('#letter').addEventListener('click', letterClick);
playAgainBtn.addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
  rndWord = Math.floor(Math.random() * words.Length);
  guessL = '';
  wrongL = '';
  winner = null;
  render();
}

function letterClick(evt) {
  guessEl.textContent = guessL;
  const letter = evt.target.tagName;
  if (
    letter !== 'BUTTON' ||
    guessL.includes(letter) ||
    wrongL.includes(letter) ||
    winner) return;
  
  winner = getWinner();
  render();
}

function getWinner() {
  if (winner === 'L') return guessL === rndWord;
  
  if (rndWord === guessL) {
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
  

  //use letterEl here so that when guess letter is clicked correctly, it turns green.
  //if letterEl is incorrect though, turn the thing red
  //otherwise, have it turn to the original brown color. (how do i code a hex into js?)
}

function renderMessage() {
  const chances = MAX_NUM_CHANCES - wrongL.length;
  if (winner) {
    messageEl.innerText = 'WOW!! CONGRATS ON GUESSING THE RIGHT WORD!';
  } else if (MAX_NUM_CHANCES < wrongL.length) {
    messageEl.innerText = 'OOPS, GAME OVER! GINGY IS BROKEN 😭 TRY AGAIN!';
  } else {
    messageEl.innerHTML == `${chances} CHANCES LEFT`;
  }
}

function renderControls() {
  playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
}
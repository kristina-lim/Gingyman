/*----- constants -----*/
const WORD_BANK = ['DREAMWORKS', 'EDDIE MURPHY', 'THE MUFFIN MAN', 'PINOCCHIO', 'SHREK IS LOVE', 'SHREK IS LIFE', 'LORD FARQUAAD', 'DONKEY', 'PRINCESS FIONA', 'PUSS IN BOOTS', 'FAR FAR AWAY', 'SHREK FOREVER AFTER', 'CAMERON DIAZ', 'MIKE MYERS', 'OGRES ARE LIKE ONIONS'];
const MAX_NUM_CHANCES = 6;

/*----- state variables -----*/
let word;
let guess;
let wrongL;
let holdL;
let winner;

/*----- cached elements  -----*/
const messageEl = document.querySelector('h2');
const guessEl = document.getElementById('guess');
const letterEl = document.querySelector('#letter');
const playAgainBtn = document.querySelector('#replay');

/*----- event listeners -----*/
document.querySelector('#letter').addEventListener('click', letterClick);
playAgainBtn.addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
  word = WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
  guess = '';
  wrongL = '';
  holdL = [];
  winner = null;

  for (let i = 0; i < word.length; i++) {
    if (word[i] == ' ') {
      holdL.push(' ');
    } else {
      holdL.push('_');
    }
  }  
  guessEl.innerHTML = holdL.join('');

  render();
}
console.log(word);

function letterClick(evt) {
  const letter = evt.target.id;
  if (evt.target.tagName !== 'BUTTON' ||
    guess.includes(letter) ||
    wrongL.includes(letter) ||
    winner) return;
  
  if (word.includes(letter)) {
    for (let i = 0; i < word.length; i++) {
      if (word.charAt(i) === letter) {
        holdL.splice(i, 1, letter);
      }
    }
    guessEl.textContent = holdL.join('');
  } else {
      wrongL += letter;
  }
  render();
}

function getWinner() {
  if (!holdL.includes('_')) return 'W';
  if (wrongL.length > MAX_NUM_CHANCES) return 'L';
  return null;
}

function render() {
  renderMessage();
  renderControls();
}

function renderMessage() {
  const chances = MAX_NUM_CHANCES - wrongL.length;
  if (winner) {
    messageEl.innerText = 'WOW!! CONGRATS ON GUESSING THE RIGHT WORD!';
  } else if (MAX_NUM_CHANCES === wrongL.length) {
    messageEl.innerText = 'OOPS, GAME OVER! GINGY IS BROKEN 😭 TRY AGAIN!';
  } else {
    messageEl.innerHTML == `${chances} CHANCES LEFT`;
  }
}

function renderControls() {
  playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
}
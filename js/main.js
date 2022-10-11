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
const letterEl = document.querySelectorAll('#letter > button');
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

  for (let i = 0; i < letterEl.length; i++) {
    letterEl[i].style.backgroundColor = '#FFEBC';
  }
  
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
  
  winner = getWinner();
  
  render();
}

function getWinner() {
  if (!holdL.includes('_')) return 'W';
  if (wrongL.length === MAX_NUM_CHANCES) return 'L';
  return null;
  
}

function render() {
  renderButtonColor();
  renderMessage();
  renderControls();
}

function renderButtonColor() {
  letterEl.forEach((button) => {
    const letterBtn = button.innerText;
    if (wrongL.includes(letterBtn)) {
      button.style.backgroundColor = 'MistyRose'; //LightCoral //MistyRose
    } else if (holdL.includes(letterBtn)) {
      button.style.backgroundColor = 'HoneyDew'; //LightGreen //HoneyDew
    } else {
      button.style.backgroundColor = '#FFEBCD';
    }
  })
}

function renderMessage() {
  guessEl.innerText === holdL.join('');
  if (winner === 'L') {
    guessEl.innerText = word;
  }

  const chances = MAX_NUM_CHANCES - wrongL.length;
  if (winner === 'W') {
    messageEl.innerText = 'WOW!! CONGRATS ON GUESSING THE RIGHT WORD!';
  } else if (winner === 'L') {
    messageEl.innerText = 'OOPS, GAME OVER! GINGY IS BROKEN 😭 TRY AGAIN!';
  } else {
    messageEl.innerText = `${chances} CHANCES LEFT`;
  }
}

function renderControls() {
  playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
}
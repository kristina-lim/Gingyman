/*----- constants -----*/
const WORD_BANK = ['DREAMWORKS', 'EDDIE MURPHY', 'THE MUFFIN MAN', 'PINOCCHIO', 'SHREK IS LOVE', 'SHREK IS LIFE', 'LORD FARQUAAD', 'DONKEY', 'PRINCESS FIONA', 'PUSS IN BOOTS', 'FAR FAR AWAY', 'SHREK FOREVER AFTER', 'CAMERON DIAZ', 'MIKE MYERS', 'OGRES ARE LIKE ONIONS', 'ALL OGRE NOW', 'YOU CRY YOU LOSE', 'DONT WORRY BE HAPPY', 'JOHN LITHGOW','FAIRY GODMOTHER', 'PRINCE CHARMING', 'QUEEN', 'JULIE ANDREWS', 'BABY DONKEY'];
const MAX_NUM_CHANCES = 6;

/*----- state variables -----*/
let word;
let wrongL;
let holdL;
let winner;

/*----- cached elements  -----*/
const messageEl = document.querySelector('h2');
const letterEl = document.querySelectorAll('#letter > button');
const guessEl = document.getElementById('guess');
const playAgainBtn = document.getElementById('replay');
const gingyEl = document.getElementById('gingy');

/*----- event listeners -----*/
document.querySelector('#letter').addEventListener('click', letterClick);
playAgainBtn.addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
  word = WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
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
    holdL.includes(letter) ||
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
  gingyEl.src = `imgs/gingy-${wrongL.length}.jpg`;
}


function renderButtonColor() {
  letterEl.forEach((button) => {
    const letterBtn = button.innerText;
    if (wrongL.includes(letterBtn)) {
      button.style.backgroundColor = '#FFE4E1'; //LightCoral#F08080 //MistyRose#FFE4E1
    } else if (holdL.includes(letterBtn)) {
      button.style.backgroundColor = '#F0FFF0'; //LightGreen#90EE90 //HoneyDew#F0FFF0
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
    messageEl.innerText = 'WOW!! CONGRATS ON GUESSING THE RIGHT WORD! ';
  } else if (winner === 'L') {
    messageEl.innerText = 'OH NO! GINGY IS BROKEN 😭 TRY AGAIN!';
  } else {
    messageEl.innerText = `${chances} CHANCES LEFT`;
  }
}

function renderControls() {
  playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
}

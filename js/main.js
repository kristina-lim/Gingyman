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
    guessL = '';
    wrongL = '';
    winner = null;
    render();
  }

  function render() {
    renderLetterColor();
    renderMessage();
  }
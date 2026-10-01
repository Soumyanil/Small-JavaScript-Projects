// Memory Game Logic

const grid = document.getElementById('grid');
const movesEl = document.getElementById('moves');
const matchesEl = document.getElementById('matches');

// Add emojis for cards. 8 pairs = 16 cards total.
const emojis = ['🍎', '🍌', '🍇', '🍉', '🥥', '🥝', '🍓', '🍒'];
let cardsArray = [];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matches = 0;

function startGame() {
  grid.innerHTML = '';
  moves = 0;
  matches = 0;
  movesEl.innerText = moves;
  matchesEl.innerText = matches;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  // Duplicate emojis to make pairs and shuffle them
  cardsArray = [...emojis, ...emojis];
  cardsArray.sort(() => 0.5 - Math.random());

  // Create UI cards
  cardsArray.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = emoji;
    
    // Create span for emoji
    const symbol = document.createElement('span');
    symbol.innerText = emoji;
    card.appendChild(symbol);
    
    // Add event listener
    card.addEventListener('click', flipCard);
    
    grid.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return; // Cant click the same card twice

  this.classList.add('flip');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  moves++;
  movesEl.innerText = moves;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.name === secondCard.dataset.name;

  if (isMatch) {
    disableCards();
    matches++;
    matchesEl.innerText = matches;
    
    if (matches === emojis.length) {
      setTimeout(() => alert(`You won in ${moves} moves! 🎉`), 500);
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');
  
  resetBoard();
}

function unflipCards() {
  lockBoard = true; // Prevent clicking other cards while animating
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Start game initially
startGame();

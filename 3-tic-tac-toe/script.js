// Tic-Tac-Toe Logic

const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');

let boardState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize Board
function initBoard() {
  boardEl.innerHTML = "";
  boardState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusEl.textContent = `Player ${currentPlayer}'s Turn`;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    boardEl.appendChild(cell);
  }
}

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  // If cell is not empty or game is over, do nothing
  if (boardState[index] !== "" || !gameActive) return;

  // Update State
  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');
  
  // Check for Win or Draw
  checkWinner();
}

function checkWinner() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusEl.textContent = `Player ${currentPlayer} Wins! 🎉`;
    gameActive = false;
    return;
  }

  // Check for draw
  if (!boardState.includes("")) {
    statusEl.textContent = "It's a Draw! 🏳️";
    gameActive = false;
    return;
  }

  // Switch Player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusEl.textContent = `Player ${currentPlayer}'s Turn`;
}

// Restart event
restartBtn.addEventListener('click', initBoard);

// Start game initially
initBoard();

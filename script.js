const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const modal = document.getElementById('result-modal');
const resultMessage = document.getElementById('result-message');
const newGameButton = document.getElementById('new-game');

let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || boardState[index]) return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    showResult(`${currentPlayer} Wins!`);
    gameActive = false;
    return;
  }

  if (boardState.every(cell => cell)) {
    showResult('It\'s a Draw!');
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
  return winningCombinations.some(combination => 
    combination.every(index => boardState[index] === currentPlayer)
  );
}

function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  boardState.fill(null);
  cells.forEach(cell => cell.textContent = '');
  modal.classList.add('hidden');
}

function showResult(message) {
  resultMessage.textContent = message;
  modal.classList.remove('hidden');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', resetGame);

resetGame();
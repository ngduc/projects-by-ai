const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameEnded = false;

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

function handleCellClick() {
  if (!gameEnded && !this.textContent) {
    this.textContent = currentPlayer;
    this.style.color = (currentPlayer === 'X') ? 'red' : 'blue';

    if (checkWin()) {
      alert(`Player ${currentPlayer} wins!`);
      gameEnded = true;
    } else if (checkDraw()) {
      alert("It's a draw!");
      gameEnded = true;
    } else {
      currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    }
  }
}

function checkWin() {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
      return true;
    }
  }

  return false;
}

function checkDraw() {
  return Array.from(cells).every(cell => cell.textContent);
}

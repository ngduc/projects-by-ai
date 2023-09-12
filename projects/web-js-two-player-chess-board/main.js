const chessboard = document.getElementById('chessboard');
const pieces = {
  white: ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
  black: ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜', '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟']
};

for (let i = 0; i < 64; i++) {
  const square = document.createElement('div');
  square.classList.add('square');
  square.classList.add(i % 2 === Math.floor(i / 8) % 2 ? 'white' : 'black');

  if (i < 16) {
    square.textContent = pieces.black[i];
  } else if (i >= 48) {
    square.textContent = pieces.white[i - 48];
  }

  square.draggable = true;
  square.addEventListener('dragstart', dragStart);
  square.addEventListener('dragover', dragOver);
  square.addEventListener('drop', drop);

  chessboard.appendChild(square);
}

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.textContent);
  e.target.textContent = '';
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  e.target.textContent = e.dataTransfer.getData('text/plain');
}

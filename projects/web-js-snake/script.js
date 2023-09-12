const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

const tileSize = 20;
const tileCount = 20;

let snake = [
  { x: 10, y: 10 },
];
let apple = getRandomPosition();

let dx = 0;
let dy = 0;

function getRandomPosition() {
  return {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
}

function drawSnakePart(snakePart) {
  context.fillStyle = "#00FF00";
  context.fillRect(snakePart.x * tileSize, snakePart.y * tileSize, tileSize, tileSize);
}

function drawApple() {
  context.fillStyle = "#FF0000";
  context.fillRect(apple.x * tileSize, apple.y * tileSize, tileSize, tileSize);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === apple.x && head.y === apple.y) {
    apple = getRandomPosition();
  } else {
    snake.pop();
  }
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  const upArrow = 38, downArrow = 40, rightArrow = 39, leftArrow = 37;

  if (keyPressed === upArrow && dy !== 1) {
    dx = 0; dy = -1;
  }
  if (keyPressed === downArrow && dy !== -1) {
    dx = 0; dy = 1;
  }
  if (keyPressed === rightArrow && dx !== -1) {
    dx = 1; dy = 0;
  }
  if (keyPressed === leftArrow && dx !== 1) {
    dx = -1; dy = 0;
  }
}

function drawGame() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  snake.forEach(drawSnakePart);
  drawApple();
}

function main() {
  document.addEventListener("keydown", changeDirection);

  setInterval(function () {
    moveSnake();
    drawGame();
  }, 100);
}

main();

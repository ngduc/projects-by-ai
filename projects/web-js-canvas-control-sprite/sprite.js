var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

var sprite = new Image();
sprite.src = 'sprite.png';

var spriteWidth = 50; // Update as per your sprite
var spriteHeight = 50; // Update as per your sprite

var direction = 'right';
var x = 0;
var y = 0;

window.addEventListener(
  'keydown',
  function (event) {
    switch (event.key) {
      case 'ArrowLeft':
        x -= 5;
        direction = 'left';
        break;
      case 'ArrowRight':
        x += 5;
        direction = 'right';
        break;
      case 'ArrowUp':
        y -= 5;
        direction = 'up';
        break;
      case 'ArrowDown':
        y += 5;
        direction = 'down';
        break;
    }
  },
  false
);

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var spriteX = 0;
  var spriteY = 0;

  switch (direction) {
    case 'left':
      spriteX = 0;
      break;
    case 'right':
      spriteX = spriteWidth;
      break;
    case 'up':
      spriteY = 0;
      break;
    case 'down':
      spriteY = spriteHeight;
      break;
  }

  ctx.drawImage(sprite, spriteX, spriteY, spriteWidth, spriteHeight, x, y, spriteWidth, spriteHeight);

  requestAnimationFrame(gameLoop);
}

sprite.onload = function () {
  gameLoop();
};

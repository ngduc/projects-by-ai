const canvas = document.getElementById('gameCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

let score = 0;

// Character properties
let character = {
  x: 50,
  y: 200,
  width: 50,
  height: 50,
  dy: 2,
  gravity: 1,
  grounded: false,
  jumpForce: 15
};

let platform = { x: 0, y: 300, width: 1200, height: 50 };

// Food objects array
let foods = [];

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw platform
  ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

  // draw character
  ctx.fillRect(character.x, character.y, character.width, character.height);

  character.y += character.dy;
  if (character.y + character.height < platform.y) {
    character.dy += character.gravity;
    character.grounded = false;
  } else {
    character.dy = 0;
    character.grounded = true;
    character.y = platform.y - character.height;
  }

  // Create food
  if (Math.random() < 0.01) {
    foods.push({ x: Math.random() * canvas.width, y: 0, width: 20, height: 20, speed: 2 });
  }

  // Draw and update food positions
  for (let i = 0; i < foods.length; i++) {
    ctx.fillRect(foods[i].x, foods[i].y, foods[i].width, foods[i].height);
    foods[i].y += foods[i].speed;

    // Check collision with character
    if (
      character.x < foods[i].x + foods[i].width &&
      character.x + character.width > foods[i].x &&
      character.y < foods[i].y + foods[i].height &&
      character.y + character.height > foods[i].y
    ) {
      foods.splice(i, 1);
      score++;
    }
  }

  // Display score
  ctx.font = '30px Arial';
  ctx.fillText(`Score: ${score}`, 10, 50);

  requestAnimationFrame(update);
}

function jump() {
  if (character.grounded) {
    character.dy -= character.jumpForce;
    character.grounded = false;
  }
}

window.addEventListener('keydown', function (event) {
  switch (event.key) {
    case 'ArrowUp':
      jump();
      break;
    case 'ArrowRight':
      character.x += 50;
      break;
    case 'ArrowLeft':
      character.x -= 50;
      break;
  }
});

update();

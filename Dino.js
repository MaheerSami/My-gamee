const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const gameContainer = document.getElementById("gameContainer");
const ground = document.getElementById("ground");
const jumpButton = document.getElementById("jumpButton");

let isJumping = false;
let gravity = 0.6;
let jumpPower = 15;
let dinoBottom = 20; // Position of dino from the ground

// Function to make the dino jump
function jump() {
  let jumpHeight = jumpPower;
  
  // Jump upwards
  let jumpInterval = setInterval(() => {
    if (jumpHeight > 0) {
      dinoBottom += 3;
      jumpHeight -= 3;
    } else {
      // Start falling down after reaching max height
      dinoBottom -= gravity;
    }

    // Stop jumping and reset when it reaches the ground
    if (dinoBottom <= 20) {
      clearInterval(jumpInterval);
      dinoBottom = 20;
      isJumping = false;
    }

    // Update dino position
    dino.style.bottom = dinoBottom + "px";
  }, 20);
}

// Jump via keyboard (spacebar)
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !isJumping) {
    isJumping = true;
    jump();
  }
});

// Jump via touch button (mobile)
jumpButton.addEventListener("click", () => {
  if (!isJumping) {
    isJumping = true;
    jump();
  }
});

// Move obstacle
let obstaclePosition = 800;
function moveObstacle() {
  obstaclePosition -= 5;

  if (obstaclePosition <= 0) {
    obstaclePosition = 800;
  }

  // Collision detection
  if (
    obstaclePosition >= 50 && obstaclePosition <= 90 && 
    dinoBottom <= 60
  ) {
    alert("Game Over! Press OK to restart.");
    location.reload();  // Restart the game
  }

  obstacle.style.left = obstaclePosition + "px";
}

// Game loop to continuously move the obstacle
function gameLoop() {
  moveObstacle();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
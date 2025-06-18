const bird = document.getElementById('bird');
const pipeU = document.querySelector('.pipeu');
const pipeD = document.querySelector('.piped');
const jumpBtn = document.getElementById("jump-btn");
const GAP_HEIGHT = 102; 
const MIN_PIPE_HEIGHT = 50;
const MAX_PIPE_HEIGHT = 400;

let birdTop = 250;
let gravity = 2;
let gameSpeed = 2;
let isGameOver = false;
let canJump=true;
let flag1=true;

function startGame(){
document.addEventListener("keydown", initializeGame);
jumpBtn.addEventListener("click", initializeGame);
}
function initializeGame() {
gameLoop();
if(flag1){
    flag1=false;
    document.removeEventListener("keydown", initializeGame);
    jumpBtn.removeEventListener("click", initializeGame);
    document.addEventListener("keydown", jump);
    jumpBtn.addEventListener("click", jump);
}
birdTop = 250;
isGameOver = false;
bird.style.top = birdTop + "px";
pipeU.style.left = "500px";
pipeD.style.left = "500px";
}

function jump() {
  if (!isGameOver && canJump) {
    birdTop -= 50;
    gameSpeed+=0.01;
    if (birdTop < 0) birdTop = 0;
    bird.style.top = birdTop + "px";

    canJump = false;
    setTimeout(() => {
      canJump = true;
    }, 150); 
  }
}

function applyGravity() {
  if (!isGameOver) {
    birdTop += gravity;
    bird.style.top = birdTop + "px";
  }
}

function movePipes() {
  let leftU = parseInt(pipeU.style.left);
  let leftD = parseInt(pipeD.style.left);

  if (leftU > -60) {
    pipeU.style.left = (leftU - gameSpeed) + "px";
    pipeD.style.left = (leftD - gameSpeed) + "px";
  } else {
    
    pipeU.style.left = "500px";
    pipeD.style.left = "500px";

    const pipeUHeight = Math.floor(Math.random() * (MAX_PIPE_HEIGHT - MIN_PIPE_HEIGHT + 1)) + MIN_PIPE_HEIGHT;
    const pipeDTop = pipeUHeight + GAP_HEIGHT;
    pipeU.style.height = pipeUHeight + "px";
    pipeD.style.top = pipeDTop + "px";
    pipeD.style.height = (600 - pipeDTop) + "px"; 
  }
}

function detectCollision() {
  const birdBox = bird.getBoundingClientRect();
  const pipeUBox = pipeU.getBoundingClientRect();
  const pipeDBox = pipeD.getBoundingClientRect();

  if (
    (birdBox.right > pipeUBox.left &&
     birdBox.left < pipeUBox.right &&
     birdBox.top < pipeUBox.bottom) ||

    (birdBox.right > pipeDBox.left &&
     birdBox.left < pipeDBox.right &&
     birdBox.bottom > pipeDBox.top)
  ) {
    gameOver();
  }

  if (birdTop <= 0 || birdTop >= 560) {
    gameOver();
  }
}

function gameOver() {
  isGameOver = true;
  gameSpeed=2;
  alert("Game Over! Press OK to restart.");
  initializeGame();
}

function gameLoop() {
  if (!isGameOver) {
    applyGravity();
    movePipes();
    detectCollision();
    requestAnimationFrame(gameLoop);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  startGame();
  
});

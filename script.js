var canvas = document.getElementById("snake");
var canvas2d = canvas.getContext("2d");
var gameEnded = false;

canvas.width = 500;
canvas.height = 500;

var directionX = 3;
var directionY = 0;
var snakeSegments = [];
var snakeLength = 1;
var snakeX = 0;
var snakeY = 0;

var dots = [];

function spawnDots() {
    if(dots.length < 10) {
      var dotX = Math.floor(Math.random() * canvas.width);
      var dotY = Math.floor(Math.random() * canvas.height);
      dots.push({ x: dotX, y: dotY });
    }
    for (var i = 0; i < dots.length; i++) {
        canvas2d.fillStyle = "red";
        canvas2d.fillRect(dots[i].x, dots[i].y, 10, 10);
      }
  }
  

document.onkeydown = function(event) {
    switch (event.code) {
        case "ArrowLeft": // Left arrow
          directionX = -10;
          directionY = 0;
          break;
        case "ArrowUp": // Up arrow
          directionX = 0;
          directionY = -10;
          break;
        case "ArrowRight": // Right arrow
          directionX = 10;
          directionY = 0;
          break;
        case "ArrowDown": // Down arrow
          directionX = 0;
          directionY = 10;
          break;
      }
};

function moveSnake() {
    snakeSegments.unshift({ x: snakeX, y: snakeY });
    snakeX += directionX;
    snakeY += directionY;
    while (snakeSegments.length > snakeLength) {
        snakeSegments.pop();
      }
  }

function checkCollision() {
    for (var i = 0; i < dots.length; i++) {
        if (snakeX < dots[i].x + 10 && 
            snakeX + 10 > dots[i].x && 
            snakeY < dots[i].y + 10 && 
            snakeY + 10 > dots[i].y) {
              snakeLength++;
              dots.splice(i, 1);
          }
    }
    if (snakeX < -10 || 
        snakeY < -10 || 
        snakeX > canvas.width+10 ||
        snakeY > canvas.height+10) {
          gameOver();
      }
      for (var i = 1; i < snakeSegments.length; i++) {
        if (snakeX === snakeSegments[i].x && snakeY === snakeSegments[i].y) {
            gameOver();
          }
      }
  }
  

function drawSnake() {
    canvas2d.clearRect(0, 0, canvas.width, canvas.height);
    canvas2d.fillStyle = "green"; 
    for (var i = 0; i < snakeSegments.length; i++) {
        canvas2d.fillRect(snakeSegments[i].x, snakeSegments[i].y, 10, 10);
      }
  }  

function gameOver() {
    setTimeout(function() {
      alert("Game over!");
    }, 500); 
    gameEnded = true
  }
  function gameLoop() {
    moveSnake();
    drawSnake();
    spawnDots();
    checkCollision();
    if(!gameEnded) {
      setTimeout(gameLoop, 100);
    }
  }
setInterval(gameLoop, 100); 
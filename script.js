var canvas = document.getElementById("snake");
var canvas2d = canvas.getContext("2d");
var gameEnded = false;

canvas.width = 500;
canvas.height = 500;

var directionX = 10;
var directionY = 0;
var snakeSegments = [];
var snakeLength = 1;
var snakeX = 0;
var snakeY = 0;


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

function drawSnake() {
    canvas2d.clearRect(0, 0, canvas.width, canvas.height);
    canvas2d.fillStyle = "green"; 
    for (var i = 0; i < snakeSegments.length; i++) {
        canvas2d.fillRect(snakeSegments[i].x, snakeSegments[i].y, 10, 10);
      }
  }  

function gameLoop() {
    moveSnake();
    drawSnake();
}
setInterval(gameLoop, 100); 
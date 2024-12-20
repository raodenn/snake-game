var canvas = document.getElementById("snake");
var canvas2d = canvas.getContext("2d");
var gameEnded = false;
canvas.width = 500;
canvas.height = 500;

var snakeSegments = [];
var snakeLength = 1;

var snakeX = 0;
var snakeY = 0;

function moveSnake() {
    snakeSegments.unshift({ x: snakeX, y: snakeY });
}

function drawSnake() {
    canvas2d.fillStyle = "green"; 
}

for (var i = 0; i < snakeSegments.length; i++) {
    canvas2d.fillRect(snakeSegments[i].x, snakeSegments[i].y, 10, 10);
  }
function gameLoop() {
    moveSnake();
    drawSnake();
}
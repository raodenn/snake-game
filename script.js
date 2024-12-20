var canvas = document.getElementById("snake");
var canvas2d = canvas.getContext("2d");
var gameEnded = false;

canvas.width = 500;
canvas.height = 500;

var directionX = 10;
var directionY = 0;
var snakeSegments = [];
var snakeLength = 1;
var snakeX = 250;
var snakeY = 250;
var dots = [];

function drawBackground() {
    canvas2d.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
}

function drawApple(x, y) {
    canvas2d.fillStyle = "red";
    canvas2d.beginPath();
    canvas2d.arc(x + 5, y + 5, 5, 0, Math.PI * 2);
    canvas2d.fill();

    canvas2d.fillStyle = "green";
    canvas2d.fillRect(x + 4, y - 2, 3, 4); 
}

function spawnDots() {
    if(dots.length < 10) {
      var dotX = Math.floor(Math.random() * canvas.width);
      var dotY = Math.floor(Math.random() * canvas.height);
      dots.push({ x: dotX, y: dotY });
    }
    for (var i = 0; i < dots.length; i++) {
          
        drawApple(dots[i].x, dots[i].y);
    }
  }
  
  document.onkeydown = function (event) {
    switch (event.code) {
        case "ArrowLeft": 
            if (directionX === 0) { 
                directionX = -10;
                directionY = 0;
            }
            break;
        case "ArrowUp": 
            if (directionY === 0) {
                directionX = 0;
                directionY = -10;
            }
            break;
        case "ArrowRight":
            if (directionX === 0) { 
                directionX = 10;
                directionY = 0;
            }
            break;
        case "ArrowDown": 
            if (directionY === 0) { 
                directionX = 0;
                directionY = 10;
            }
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
    for (var i = 0; i < snakeSegments.length; i++) {
        
        var gradient = canvas2d.createLinearGradient(
            snakeSegments[i].x,
            snakeSegments[i].y,
            snakeSegments[i].x + 10,
            snakeSegments[i].y + 10
        );
        gradient.addColorStop(0, "#4caf50"); 
        gradient.addColorStop(1, "#2e7d32"); 

        canvas2d.fillStyle = gradient;
        canvas2d.fillRect(snakeSegments[i].x, snakeSegments[i].y, 10, 10);

        if (i === 0) {
            canvas2d.fillStyle = "black";
            canvas2d.fillRect(snakeSegments[i].x + 2, snakeSegments[i].y + 2, 2, 2); 
            canvas2d.fillRect(snakeSegments[i].x + 6, snakeSegments[i].y + 2, 2, 2); 
        }
    }
}


function gameOver() {
    setTimeout(function() {
      alert("Game over!");
    }, 500); 
    gameEnded = true
  }
  function gameLoop() {
    drawBackground();
    moveSnake();
    drawSnake();
    spawnDots();
    checkCollision();
    if(!gameEnded) {
      setTimeout(gameLoop, 100);
    }
  }

 gameLoop();
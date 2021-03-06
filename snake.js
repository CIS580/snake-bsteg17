/* Global variables */
var frontBuffer = document.getElementById('snake');
var frontCtx = frontBuffer.getContext('2d');
var backBuffer = document.createElement('canvas');
backBuffer.width = frontBuffer.width;
backBuffer.height = frontBuffer.height;
var backCtx = backBuffer.getContext('2d');

var oldTime = performance.now();
var timeSinceLastFrame = 0;
var milliSecondsPerFrame = 300;

var GRID_WIDTH = 30;
var GRID_HEIGHT = 30;
var cellWidth = backBuffer.width / GRID_WIDTH;
var cellHeight = backBuffer.height / GRID_HEIGHT;

var NUM_LETTERS = 100;
var LETTER_MAX_SPEED = 2;

var SNAKE_STARTING_X = 10;
var SNAKE_STARTING_Y = 10;

var grid = new Array(GRID_WIDTH);
for (i = 0; i < GRID_WIDTH; i++) {
  grid[i] = new Array(GRID_HEIGHT);
}
grid[SNAKE_STARTING_X][SNAKE_STARTING_Y] = "not null";

var snake = new SnakeSection(SNAKE_STARTING_X, SNAKE_STARTING_Y, true, null, null, "black");
snake.nextDirection = 39; //right arrow
var letters = Letter.initLetters();

document.getElementById("points").innerHTML = 0;

/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
function loop(newTime) {
  var elapsedTime = newTime - oldTime;
  timeSinceLastFrame += elapsedTime;
  oldTime = newTime;

  if (timeSinceLastFrame >= milliSecondsPerFrame) {
    while (timeSinceLastFrame >= milliSecondsPerFrame) {
      timeSinceLastFrame -= milliSecondsPerFrame;
      update();
    }
    render();
  }

  // Flip the back buffer
  frontCtx.drawImage(backBuffer, 0, 0);

  // Run the next loop
  window.requestAnimationFrame(loop);
}

/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {elapsedTime} A DOMHighResTimeStamp indicting
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {
  letters.forEach(function(letter) {
    letter.update();
  });
  snake.update();
}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {elapsedTime} A DOMHighResTimeStamp indicting
  * the number of milliseconds passed since the last frame.
  */
function render(elapsedTime) {
  clearCanvas();
  letters.forEach(function(letter) {
    letter.draw();
  });
  snake.draw();
}

function clearCanvas() {
  backCtx.fillStyle = "white";
  backCtx.fillRect(0, 0, backBuffer.width, backBuffer.height);
}

function endGame() {
  document.getElementsByTagName("body")[0].removeChild(document.getElementById("snake"));
  gameOverHTML = '<h2>GAME OVER</h2><br /><img src="https://media.giphy.com/media/nyoPqKlzINpHq/giphy.gif" height="600px" width="800px" />';
  document.getElementsByTagName("body")[0].innerHTML = gameOverHTML;
}

function winGame() {
  document.getElementsByTagName("body")[0].removeChild(document.getElementById("snake"));
  gameOverHTML = '<h2>YOU WIN</h2><br /><img src="https://media.giphy.com/media/5nAQJljp31ztC/giphy.gif" height="600px" width="800px" />';
  document.getElementsByTagName("body")[0].innerHTML = gameOverHTML;
}

window.onkeydown = function(event) {
  snake.nextDirection = event.keyCode;
}

/* Launch the game */
window.requestAnimationFrame(loop);

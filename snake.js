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

var snake = new SnakeSection(true);
var letter = new Letter();

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
  snake.update();
  letter.update();
}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {elapsedTime} A DOMHighResTimeStamp indicting
  * the number of milliseconds passed since the last frame.
  */
function render(elapsedTime) {
  clearCanvas();
  letter.draw();
  snake.draw();
}

function clearCanvas() {
  backCtx.fillStyle = "white";
  backCtx.fillRect(0, 0, backBuffer.width, backBuffer.height);
}

window.onkeydown = function(event) {
  snake.direction = event.keyCode;
}

/* Launch the game */
window.requestAnimationFrame(loop);

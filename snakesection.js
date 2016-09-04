function SnakeSection(x, y, isHead, parent, letter) {
	this.x = x;
	this.y = y;
	this.direction = null;
	this.isHead = isHead;
	this.child = null;
	this.parent = null;
	this.letter = letter;
}

SnakeSection.prototype.update = function() {
	this.updatePosition();
	if (this.isHead) {
		this.checkCollision();
	}
}

SnakeSection.prototype.updatePosition = function() {
	switch(this.direction) {
		case 37:
			this.x--; //left arrow
			break;
		case 38:
			this.y--; //up arrow
			break;
		case 39: //right arrow
			this.x++;
			break;
		case 40:
			this.y++; //down arrow
			break;
		default:
			break;
	}
}

SnakeSection.prototype.checkCollision = function() {
	this._collidingWithWall();
	this._collidingWithLetter();
}

SnakeSection.prototype.draw = function() {
	backCtx.fillStyle = "black";
	backCtx.fillRect((this.x * cellWidth), (this.y * cellHeight), cellWidth, cellHeight);
	if (this.child != null) {
		this.child.draw();
	}
}

/* private */

SnakeSection.prototype._collidingWithWall = function() {
	if (this.x < 0 || this.x > GRID_WIDTH) {
		console.log("COLLISION");
	}
	if (this.y < 0 || this.y > GRID_HEIGHT) {
		console.log("COLLISION");
	}
}

SnakeSection.prototype._collidingWithLetter = function() {
	snake = this;
	letters.forEach(function(letter) {
		if (letter.x == snake.x && letter.y == snake.y) {
			snake._addChild(letter);
		}
	});
}

SnakeSection.prototype._addChild = function(letter) {
	this.child = new SnakeSection(this.x, this.y, false, this, letter);
}

// function wait(ms){
//    var start = new Date().getTime();
//    var end = start;
//    while(end < start + ms) {
//      end = new Date().getTime();
//   }
// }
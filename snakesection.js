function SnakeSection(x, y, isHead, parent, letter, color) {
	this.x = x;
	this.y = y;
	this.nextDirection = null;
	this.currentDirection = null;
	this.isHead = isHead;
	this.child = null;
	this.parent = parent;
	this.letter = letter;
	this.color = color;
}

SnakeSection.prototype.update = function() {
	this.currentDirection = this.nextDirection;
	if (this.parent) {
		this.nextDirection = this.parent.currentDirection;
		console.log(this.nextDirection)
	}
	this.updatePosition();
	if (this.isHead) {
		this.checkCollision();
	}
	if (this.child) {
		this.child.update();		
	}
}

SnakeSection.prototype.updatePosition = function() {
	switch(this.currentDirection) {
		case 37: //left arrow
			this.x--; 
			break;
		case 38: //up arrow
			this.y--; 
			break;
		case 39: //right arrow
			this.x++;
			break;
		case 40: //down arrow
			this.y++; 
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
	backCtx.fillStyle = this.color;
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
	var childX;
	var childY;
	switch(this.currentDirection) {
		case 37: //left arrow
			childX = this.x + 1;
			childY = this.y;
			break;
		case 38: //up arrow
			childX = this.x;
			childY = this.y + 1;
			break;
		case 39: //right arrow
			childX = this.x - 1;
			childY = this.y
			break;
		case 40: //down arrow
			childX = this.x;
			childY = this.y - 1;
			break;
		default:
			break;
	}
	// youngest = this;
	// while (youngest.child != null) {
		// youngest = youngest.child;
	// }
	// youngest.child = new SnakeSection(childX, childY, false, this, letter, "blue");
	this.child = new SnakeSection(childX, childY, false, this, letter, "blue");
}

// function wait(ms){
//    var start = new Date().getTime();
//    var end = start;
//    while(end < start + ms) {
//      end = new Date().getTime();
//   }
// }
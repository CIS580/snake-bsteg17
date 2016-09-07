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
	}
	if (this.isHead) {
		this.checkCollision();
	}
	this.updatePosition();
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
	nextCell = snake._getNextCell();
	this._collidingWithWall(nextCell);
	this._collidingWithLetter(nextCell);
}

SnakeSection.prototype.draw = function() {
	backCtx.fillStyle = this.color;
	if (this.isHead) {
		backCtx.fillRect((this.x * cellWidth), (this.y * cellHeight), cellWidth, cellHeight);
	} else {
		backCtx.strokeText(this.letter, (this.x * cellWidth), ((this.y + 1) * cellHeight), cellWidth);
	}
	if (this.child != null) {
		this.child.draw();
	}
}

/* private */

SnakeSection.prototype._getNextCell = function() {
	switch(this.currentDirection) {
		case 37: //left arrow
			return {x:(this.x - 1), y:(this.y)}; 
		case 38: //up arrow
			return {x:(this.x), y:(this.y - 1)}; 
		case 39: //right arrow
			return {x:(this.x + 1), y:(this.y)}; 
		case 40: //down arrow
			return {x:(this.x), y:(this.y + 1)}; 
		default:
			return {x:0, y:0};
	}
}

SnakeSection.prototype._collidingWithWall = function(nextCell) {
	if (!nextCell) {
		return;
	}
	if (nextCell.x < 0 || nextCell.x > GRID_WIDTH) {
		console.log("COLLISION");
	}
	if (nextCell.y < 0 || nextCell.y > GRID_HEIGHT) {
		console.log("COLLISION");
	}
}

SnakeSection.prototype._collidingWithLetter = function(nextCell) {
	snake = this;
	letters.forEach(function(letter, i) {
		if (letter.x == nextCell.x && letter.y == nextCell.y) {
			letters.splice(i, 1);
			snake._addChild(letter);
		}
	});
}

SnakeSection.prototype._addChild = function(letter) {
	var childX;
	var childY;
	tail = snake._getTail();
	tail.child = new SnakeSection(tail.x, tail.y, false, tail, letter, "blue");
}

SnakeSection.prototype._getTail = function() {
	tail = this;
	while (tail.child != null) {
		tail = tail.child;
	}
	return tail;
}

// function wait(ms){
//    var start = new Date().getTime();
//    var end = start;
//    while(end < start + ms) {
//      end = new Date().getTime();
//   }
// }
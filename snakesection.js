function SnakeSection(isHead) {
	this.x = 10;
	this.y = 10;
	this.direction = null;
	this.isHead = isHead;
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
	if (this.x < 0 || this.x > GRID_WIDTH) {
		console.log("COLLISION");
	}
	if (this.y < 0 || this.y > GRID_HEIGHT) {
		console.log("COLLISION");
	}
}

SnakeSection.prototype.draw = function() {
	backCtx.fillStyle = "black";
	backCtx.fillRect((this.x * cellWidth), (this.y * cellHeight), cellWidth, cellHeight);
}

// function wait(ms){
//    var start = new Date().getTime();
//    var end = start;
//    while(end < start + ms) {
//      end = new Date().getTime();
//   }
// }
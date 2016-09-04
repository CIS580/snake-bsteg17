function SnakeSection() {
	this.x = 10;
	this.y = 10;
	this.direction = null;
}

SnakeSection.prototype.updatePosition = function() {
	this.updateCoordinates();
}

SnakeSection.prototype.draw = function() {
	backCtx.fillRect(this.x, this.y, cellWidth, cellHeight);
}

/* private */

SnakeSection.prototype.updateCoordinates = function() {
	switch(this.direction) {
		case 37:
			this.x--; //left arrow
			console.log(this.direction);
			break;
		case 38:
			this.y--; //up arrow
			console.log(this.direction);
			break;
		case 39: //right arrow
			this.x++;
			console.log(this.direction);
			break;
		case 40:
			this.y++; //down arrow
			console.log(this.direction);
			break;
		default:
			console.log("default")
			break;
	}
}
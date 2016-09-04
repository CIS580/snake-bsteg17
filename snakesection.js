function SnakeSection() {
	this.x = 10;
	this.y = 10;
	this.direction = null;
}

SnakeSection.prototype.updatePosition = function() {
	this.updateCoordinates();
}

SnakeSection.prototype.draw = function() {
	backCtx.fillStyle = "black";
	backCtx.fillRect((this.x * cellWidth), (this.y * cellHeight), cellWidth, cellHeight);
}

/* private */

SnakeSection.prototype.updateCoordinates = function() {
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

// function wait(ms){
//    var start = new Date().getTime();
//    var end = start;
//    while(end < start + ms) {
//      end = new Date().getTime();
//   }
// }
function Letter() {
	this.x = Math.floor(Math.random() * GRID_WIDTH);
	this.y = 0;
	this.letter = "A";
}

Letter.prototype.update = function() {

}

Letter.prototype.draw = function() {
	backCtx.fillStyle = "red";
	backCtx.fillRect((this.x * cellWidth), (this.y * cellHeight), cellWidth, cellHeight);
}
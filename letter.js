function Letter() {
	this.x = Math.floor(Math.random() * GRID_WIDTH);
	this.y = 0;
}

Letter.prototype.update = function() {

}

Letter.prototype.draw = function() {
	console.log(this.x, this.y)
	backCtx.fillStyle = "red";
	backCtx.fillRect((this.x * cellWidth), (this.y * cellHeight), cellWidth, cellHeight);
}
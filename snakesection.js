function SnakeSection() {
	x = 0;
	y = 0;

	this.draw = function() {
		backCtx.fillRect(x, y, cellWidth, cellHeight);
	}
}
function Letter(x, y) {
	this.x = x;
	this.y = y;
	this.letter = "A";
}

Letter.prototype.update = function() {
	
}

Letter.prototype.draw = function() {
	backCtx.fillStyle = "red";
	backCtx.fillRect((this.x * cellWidth), (this.y * cellHeight), cellWidth, cellHeight);
}

Letter.initLetters = function() {
	grid = new Array(GRID_WIDTH);
	for (i = 0; i < GRID_WIDTH; i++) {
		grid[i] = new Array(GRID_HEIGHT);
	}

	letters = [];
	var row;
	var column;
	for (i = 0; i < NUM_LETTERS; i++) {
		do {
			row = Math.floor(Math.random() * GRID_HEIGHT);
			column = Math.floor(Math.random() * GRID_WIDTH);
		} while (grid[row][column] != null);
		grid[row][column] = "not null";
		letters.push( new Letter(row, column) );
	}
	return letters;
}
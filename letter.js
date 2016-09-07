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

Letter.addLetter = function() {
	var row;
	var column;
	do {
		row = Math.floor(Math.random() * GRID_HEIGHT);
		column = Math.floor(Math.random() * GRID_WIDTH);
	} while (grid[row][column] != null);
	grid[row][column] = "not null";
	return new Letter(row, column);
}

Letter.initLetters = function() {
	letters = [];
	for (i = 0; i < NUM_LETTERS; i++) {
		letters.push( Letter.addLetter() );
	}
	return letters;
}
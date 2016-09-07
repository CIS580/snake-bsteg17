function Letter(x, y) {
	this.x = x;
	this.y = y;
	this.letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
}

Letter.prototype.update = function() {
	
}

Letter.prototype.draw = function() {
	backCtx.font = cellHeight+"px Arial";
	backCtx.strokeStyle = "black";
	backCtx.strokeText(this.letter, (this.x * cellWidth), ((this.y + 1) * cellHeight), cellWidth);
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
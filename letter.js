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

Letter.initLetters = function() {
	columns = new Array(GRID_WIDTH);
	for (i = 0; i < NUM_LETTERS; i++) {
		do {
			letter = new Letter();
		} while (columns[letter.x] != null);
		columns[letter.x] = letter;
	}
	return columns.filter(function(index){ if (index == null) {return false} else {return true} });
}
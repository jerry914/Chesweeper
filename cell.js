function Cell(i, j, w) {
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.neighborCount = 0;
  this.bee = false;
  this.revealed = false;
}

Cell.prototype.show = function() {
  rectMode(CORNER);
  stroke('#00796B');
  strokeWeight(4);
  fill('#B2DFDB');
  rect(this.x + (windowWidth - this.w * 18) / 2, this.y + (windowHeight - this.w * 7) / 2, this.w, this.w, 5);
  if (this.revealed) {
    if (this.bee && gameScreen !=7) {
        fill('#FFFFFF');
        rect(this.x + (windowWidth - this.w * 18) / 2, this.y + (windowHeight - this.w * 7) / 2, this.w, this.w, 5);
        fill('#FF4081');
        noStroke();
        ellipse(this.x + (windowWidth - this.w * 18) / 2 + this.w * 0.5, this.y + (windowHeight - this.w * 7) / 2 + this.w * 0.5, this.w * 0.5);
    }
    else if(gameScreen == 7){
      var ex = floor(random(2));
      var exRa = floor(random(this.w));
      fill('#FFFFFF');
      rect(this.x + (windowWidth - this.w * 18) / 2, this.y + (windowHeight - this.w * 7) / 2, this.w, this.w, 5);
      if(ex==0){
        fill('#FF4081');
        noStroke();
        ellipse(this.x + (windowWidth - this.w * 18) / 2 + this.w * 0.5, this.y + (windowHeight - this.w * 7) / 2 + this.w * 0.5, exRa);
      }
    }
     else{
      fill('#BDBDBD');
      rect(this.x + (windowWidth - this.w * 18) / 2, this.y + (windowHeight - this.w * 7) / 2, this.w, this.w, 5);
      if (this.neighborCount > 0) {
        textAlign(CENTER, CORNER);
        textSize(this.w);
        fill(0);
        noStroke();
        text(this.neighborCount, this.x + (windowWidth - this.w * 18) / 2 + this.w * 0.5, this.y + (windowHeight - this.w * 7) / 2 + this.w - 7);
      }
    }
  }
}

Cell.prototype.countBees = function() {
  if (this.bee) {
    this.neighborCount = -1;
    return;
  }
  var total = 0;
  for (var xoff = -1; xoff <= 1; xoff++) {
    var i = this.i + xoff;
    if (i < 0 || i >= cols) continue;
    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= rows) continue;
      var neighbor = grid[i][j];
      if (neighbor.bee) {
        total++;
      }
    }
  }
  this.neighborCount = total;
}

Cell.prototype.contains = function(x, y) {
  return (x > this.x + (windowWidth - this.w * 18) / 2 && x < this.x + (windowWidth - this.w * 18) / 2 + this.w && y > this.y + (windowHeight - this.w * 7) / 2 && y < this.y + (windowHeight - this.w * 7) / 2 + this.w);
}

Cell.prototype.reveal = function() {
  this.revealed = true;
  if (this.neighborCount == 0) {
    this.floodFill();
  }
}

Cell.prototype.floodFill = function() {
  for (var xoff = -1; xoff <= 1; xoff++) {
    var i = this.i + xoff;
    if (i < 0 || i >= cols) continue;
    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= rows) continue;

      var neighbor = grid[i][j];
      if (!neighbor.revealed) {
        neighbor.reveal();
      }
    }
  }
}

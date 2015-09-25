function env(g) {
  g.env = {
    height: 16,
    width: 13,
    tiles: [
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 3, 0, 0, 0, 0, 2, 0, 0, 0, 0, 3, 2],
      [2, 0, 2, 2, 2, 0, 2, 0, 2, 2, 2, 0, 2],
      [2, 0, 2, 2, 2, 0, 2, 0, 2, 2, 2, 0, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 2, 2, 0 ,2, 2, 10, 2, 2, 0, 2, 2, 2],
      [2, 0, 0, 0 ,2, 1, 1, 1, 2, 0, 0, 0, 2],
      [2, 0, 2, 0 ,2, 1, 1, 1, 2, 0, 2, 0, 2],
      [2, 0, 2, 0 ,2, 2, 2, 2, 2, 0, 2, 0, 2],
      [2, 0, 2, 0 ,2, 0, 0, 0, 2, 0, 2, 0, 2],
      [9, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 9],
      [2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2],
      [2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2],
      [2, 0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0, 2],
      [2, 3, 0, 0 ,0, 0, 2, 0, 0, 0, 0, 3, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    ],
    nodes: [],
    types: {
      0: '&middot;', // bead
      1: '&nbsp;',   // empty
      2: '&squ;',    // wall
      3: '&hercon;', // big bead
      4: 'o', // Pacman
      5: 'M', // Blinky
      6: 'M', // Pinky
      7: 'M', // Inky
      8: 'M', // Clyde
      9: '#', // portal
      10: '-', // door
    },
    reset: function(x, y) {
      var t = this.tiles[y][x];
      this.nodes[y][x].className = 'tile t-' + t;
      this.nodes[y][x].innerHTML = this.types[t];
    },
    visit: function(x, y) {
      var t = this.tiles[y][x];
      if (t == 0) {
        g.updateScore();
        this.tiles[y][x] = 1;
      }
      return t;
    },
    tileDirection: function(x, y, d) {
      if (d == 0) {
          return this.tiles[y - 1][x];
      } else if (d == 1) {
          return this.tiles[y][x + 1];
      } else if (d == 2) {
          return this.tiles[y + 1][x];
      } else if (d == 3) {
          return this.tiles[y][x - 1];
      }
      return this.tiles[y][x];
    },
    setNode: function(i, j, type) {

    },
    nodes: [],
    init: function() {
      var r = '';
      for (var i = 0; i < this.height; i++) {
        r += '<span id="row-' + i + '" class="row">';
        for (var j = 0; j < this.width; j++) {
          var ident = this.tiles[i][j];
          var c = 't-' + ident;
          var t = this.types[ident];
          r += '<span id="tile-' + i + '-' + j + '" class="tile ' + c + '">' + t + '</span>';
        }
        r += '</span>';
      }
      game.container.arena.innerHTML = r;

      this.nodes = [];
      for (var i = 0; i < this.height; i++) {
        this.nodes[i] = [];
        for (var j = 0; j < this.width; j++) {
          this.nodes[i][j] = document.getElementById('tile-' + i + '-' + j);
        }
      }
    },
    update: function(tick) {
      // console.log(tick);
    },
    dist: function(x, y, tx, ty) {
      return ;
    },
    isIntersection: function(x, y) {
      var up = this.tileDirection(x, y - 1) == 2 ? 1 : 0;
      var right = this.tileDirection(x + 1, y) == 2 ? 1 : 0;
      var down = this.tileDirection(x, y + 1) == 2 ? 1 : 0;
      var left = this.tileDirection(x - 1, y) == 2 ? 1 : 0;
      var sum = up + right + down + left;
      return sum < 2;
    }
  }

  return g.env;
}

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
      [2, 2, 2, 0 ,2, 2, 0, 2, 2, 0, 2, 2, 2],
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
    }
  }

  return g.env;
}

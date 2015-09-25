function pacman(g) {
  var cMap = {
    '119': '0', // w
    '100': '1', // d
    '115': '2', // s
    '97': '3',  // a
    '38': '0', // up
    '39': '1', // right
    '40': '2', // down
    '37': '3'  // left
  }

  g.pacman = {
    direction: 0,
    desire: 0,
    position: { x: 6, y: 14},
    onKey: function(e) {
      var key = window.event ? event.keyCode: e.keyCode;
      var newDir = cMap[key] ? cMap[key] : this.direction;
      console.log(newDir);
      // var n_dir = c_map[c] ? c_map[c] : dir;
      // var n_tile = tile_d(n_dir);
      // desire = n_dir;
      // if (n_tile != undefined && n_tile != 2) {
      //     dir = n_dir;
      // }
    },
    init: function() {
      document.onkeydown = this.onKey.bind(this);
    },
    update: function(tick) {
      console.log(this.position);
      this.render();
    }
  }

  return g.pacman;
}

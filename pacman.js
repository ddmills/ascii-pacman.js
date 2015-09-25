function pacman(g) {
  var player = {
    '0': '&utrif;',
    '1': '&rtrif;',
    '2': '&dtrif;',
    '3': '&ltrif;'
  }

  var cMap = {
    '87': 0, // w
    '68': 1, // d
    '83': 2, // s
    '65': 3,  // a
    '38': 0,  // up
    '39': 1,  // right
    '40': 2,  // down
    '37': 3   // left
  }

  g.pacman = {
    direction: 0,
    desire: 0,
    x: 6,
    y: 13,
    onKey: function(e) {
      var key = window.event ? event.keyCode: e.keyCode;
      var newDir = cMap[key] == undefined ? this.direction : cMap[key];
      var next = g.env.tileDirection(this.x, this.y, newDir);
      this.desire = newDir;
      if (next != undefined && next != 2) {
        this.direction = newDir;
      }
      this.render();
    },
    init: function() {
      document.onkeydown = this.onKey.bind(this);
    },
    updatePosition: function() {
      var next = g.env.tileDirection(this.x, this.y, this.desire);
      console.log(this.desire);
      if (next != undefined && next != 2) {
        this.direction = this.desire;
      } else {
        next = g.env.tileDirection(this.x, this.y, this.direction);
      }

      if (next != undefined && next != 2) {
        switch (this.direction) {
        case 0:
          this.y = this.y - 1;
          break;
        case 1:
          this.x = this.x + 1;
          break;
        case 2:
          this.y = this.y + 1;
          break;
        case 3:
          this.x = this.x - 1;
          break;
        default:
        }
      }
    },
    render: function() {
      var node = g.env.nodes[this.y][this.x];
      node.className = 'tile t-4';
      node.innerHTML = player[this.direction];
    },
    update: function(tick) {
      g.env.reset(this.x, this.y);
      this.updatePosition();
      g.env.visit(this.x, this.y);
      this.render();
    }
  }

  return g.pacman;
}

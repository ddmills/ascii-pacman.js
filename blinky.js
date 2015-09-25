/*
 * Logic for "Blinky" (The red "aggressive" ghost)
 *
 *        ###########
 *     #################
 *    ####################
 *   ####     ####     ####
 *   ####     ####     ####
 *   ######################
 *   ######################
 *   ######################
 *   ##  #####    #####  ##
 *   #    ##        ##    #
 *
 */

function blinky(g) {
  g.blinky = {
    x: 6,
    y: 4,
    px: 6,
    py: 4,
    direction: 1,
    config: {
      loc: {'x': 5, 'y': 3},
      speed: 1,
      lastMove: 0
    },
    render: function() {
      var node = g.env.nodes[this.y][this.x];
      node.className = 'tile t-5';
      node.innerHTML = 'M';
    },
    getTarget: function() {
      return { x: g.pacman.x, y: g.pacman.y };
    },
    updatePosition: function() {
      var up = g.env.tileDirection(this.x, this.y - 1);
      var right = g.env.tileDirection(this.x + 1, this.y);
      var down = g.env.tileDirection(this.x, this.y + 1);
      var left = g.env.tileDirection(this.x - 1, this.y);

      up = up == 10 || up == 2 || right == 9 ? 1 : 0;
      right = right == 10 || right == 2 || right == 9 ? 1 : 0;
      down = down == 10 || down == 2 || down == 9 ? 1 : 0;
      left = left == 10 || left == 2 || left == 9 ? 1 : 0;

      var sum = up + right + down + left;

      if (sum < 2) {
        // ghost hit intersection, re-evaluate
        console.log('HIT INTER');

        var minDist = 100000;
        var minDir = 0;

        var target = this.getTarget();
        var tx = target.x;
        var ty = target.y;

        if (!up && this.direction != 2) {
          var dist = (tx-this.x) * (tx-this.x) + (ty-(this.y-1)) * (ty-(this.y-1));
          if (dist < minDist) {
            minDist = dist;
            minDir = 0;
          }
        }

        if (!right && this.direction != 3) {
          var dist = (tx-(this.x+1)) * (tx-(this.x+1)) + (ty-this.y) * (ty-this.y);
          if (dist < minDist) {
            minDist = dist;
            minDir = 1;
          }
        }

        if (!down && this.direction != 0) {
          var dist = (tx-this.x) * (tx-this.x) + (ty-(this.y+1)) * (ty-(this.y+1));
          if (dist < minDist) {
            minDist = dist;
            minDir = 2;
          }
        }

        if (!left && this.direction != 1) {
          var dist = (tx-(this.x-1)) * (tx-(this.x-1)) + (ty-this.y) * (ty-this.y);
          if (dist < minDist) {
            minDist = dist;
            minDir = 3;
          }
        }

        console.log(this.direction, minDir, minDist);
        // this.direction = minDir;
        this.direction = minDir;
      }

      var next = g.env.tileDirection(this.x, this.y, this.direction);

      if (next == undefined || next == 2) {
        if (!up && this.direction != 2) {
          this.direction = 0;
        } else if (!right && this.direction != 3) {
          this.direction = 1;
        } else if (!down && this.direction != 0) {
          this.direction = 2;
        } else if (!left && this.direction != 1) {
          this.direction = 3;
        }
      }

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
    },
    init: function() {
      this.render();
    },
    update: function(tick) {
      // blinky is the most aggressive ghost, mostly because his target
      // is the same as the position of pacman.
      // var target = pos;
      g.env.reset(this.x, this.y);
      this.updatePosition();
      this.render();
    }
  }

  return g.blinky;
}

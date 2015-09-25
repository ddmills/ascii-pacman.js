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
    config: {
      loc: {'x': 5, 'y': 3},
      speed: 1,
      lastMove: 0
    },
    init: function() {

    },
    update: function(tick) {
      // blinky is the most aggressive ghost, mostly because his target
      // is the same as the position of pacman.
      // var target = pos;
    }
  }

  return g.blinky;
}

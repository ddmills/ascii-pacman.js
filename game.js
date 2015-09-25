window.game = {
  container: {
    arena: document.getElementById('arena'),
    score: document.getElementById('score')
  },
  config: {
    speed: 300,
    score: 0,
    won: false
  },
  meta: {
    tick: 0,
    interval: null
  },
  hooks: [],
  init: function() {
    for (var i = 0; i < this.hooks.length; i++) {
      this.hooks[i].init();
    }
  },
  tick: function() {
    this.meta.tick++;
    for (var i = 0; i < this.hooks.length; i++) {
      this.hooks[i].update(this.meta.tick);
    }
  },
  start: function() {
    this.meta.interval = setInterval(this.tick.bind(this), this.config.speed);
  },
  stop: function() {
    clearInterval(this.meta.interval);
  }
}

game.hooks.push(env(game));
game.hooks.push(blinky(game));
game.hooks.push(pacman(game));

game.init();
game.start();

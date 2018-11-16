function Player(xpos, ypos) {
  this.xpos = xpos,
  this.ypos = ypos,
  this.dead = false,
  this.color = Player.prototype.colorBank[Math.floor((Math.random() * Player.prototype.colorBank.length))],
  this.update = function() {

  },

  this.display = function() {

  }


}

Player.prototype.velocity = 1;
Player.prototype.colorBank = ['blue', 'red', 'yellow', 'green', 'magenta', 'cyan', 'black', 'purple', 'orange', 'tan', 'brown', 'pink'];

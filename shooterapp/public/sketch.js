var socket;
var playerArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // const dbURL = '../database.json'
  // data = loadJSON(dbURL, drawEllipse);

  socket = io.connect('http://localhost:3000'); 
  socket.on('newUser', createPlayer);
  socket.on('addedPlayer', addPlayer);



}

function addPlayer(user) {
  playerArray[playerArray.length] = user;
}

function createPlayer() {
  playerArray[playerArray.length] = new Player(100,100);
  // console.log(playerArray[playerArray.length - 1]);
  socket.emit('newUser', playerArray[playerArray.length - 1]);

}

function draw() {
  clear();
  // console.log(player1);
  for (let i = 0; i < playerArray.length; i++) {
    playerArray[i].update();
  }
  for (let i = 0; i < playerArray.length; i++) {
    playerArray[i].display();
  }
}

function mouseCoor() {
  console.log('x: ' + mouseX + ', y: ' + mouseY);
}



// function drawEllipse(data) {
//   var numUsers = data.users;
//   console.log(data.users);
//   for (let i = 0; i < numUsers; i++) { 
//     ellipse(80+(i*100), 80, 80, 80);
//   }
// }
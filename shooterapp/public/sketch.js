var socket;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // const dbURL = '../database.json'
  // data = loadJSON(dbURL, drawEllipse);

  socket = io.connect('http://localhost:3000'); 

  socket.emit('entered', {});
  socket.on('entered', newDraw);
}

function newDraw(data) {
  ellipse(data.x, data.y, 80, 80);
  console.log('Recieved event');
}

function draw() {
  
}



// function drawEllipse(data) {
//   var numUsers = data.users;
//   console.log(data.users);
//   for (let i = 0; i < numUsers; i++) { 
//     ellipse(80+(i*100), 80, 80, 80);
//   }
// }
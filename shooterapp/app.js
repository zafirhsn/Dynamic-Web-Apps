const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');

app.use(express.static('public'));
app.set('view engine', 'ejs');

// var exists = fs.existsSync('public/database.json');
// var data;
// if (exists) {
//   console.log('Loading database');
//   var txt = fs.readFileSync('public/database.json', 'utf-8');
//   data = JSON.parse(txt);
// }

app.get('/', (req, res) => {
  res.render('index');
});

var x = 50;
var y = 100;
io.on('connection', (socket)=> {
  console.log('a user connected');

  io.to(socket.id).emit('hello', {hello: true});

});

  // console.log(socket.id);
  // data['users'] += 1;
  // let dataString = JSON.stringify(data);
  // fs.writeFile('public/database.JSON', dataString, ()=> {
  //   console.log(data['users']);
  // });



http.listen(3000, ()=> {
  console.log("App is listening on port 3000...");
});


// render ejs -> client socket sends data on event -> server socket recieves data -> server socket broadcasts data -> client socket recieves data -> client draws new stuff with data 
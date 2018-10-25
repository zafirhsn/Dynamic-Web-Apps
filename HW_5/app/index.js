const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
// Once I add this module, I will be able to get the values from my html file in the body of the request once I hit submit
const bodyParser = require('body-parser');

// Allow cors
app.use(cors());
// No idea what this actually means, but I need it
app.use(bodyParser.urlencoded({ extended: true })); 
// Serve staic files from this folder
app.use(express.static('public'));

// const port = 8000;
// const server = app.listen(port, listening);

// function listening() {
//   console.log('listening on port ' + port);
// }

const server = app.listen(process.env.PORT || 8000, listening);

function listening() {
  var host = server.address().address;
  var port = server.address().port;
  // console.log(host);
  console.log('Listening at http://' + host + ':' + port);
}

// Check to see if the file we're tryinng to read from exists
var data; 
var exists = fs.existsSync('data.json');
if (exists) {
  console.log('loading words');
  var txt = fs.readFileSync('data.json', 'utf-8');
  data = JSON.parse(txt);
}
else {
  console.log("no words");

}

// We are getting the data after hitting submit and writing it to the JSON file
app.post('/', function(req, res) {
  console.log(req.body);
  var city = req.body.city;
  var score = req.body.score;
  data[city] = score;
  var dataString = JSON.stringify(data);
  fs.writeFile('data.json', dataString, function() {
    console.log("Got the word");
  });
  res.send("Thank you for rating " + city);

});

app.get('/all', function(req, res) {
  res.send(data);
})

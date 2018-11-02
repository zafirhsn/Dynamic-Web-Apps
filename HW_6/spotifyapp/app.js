const app = require('express')();
const ejs = require('ejs');
const bodyParser = require('body-parser');
// const fetch = require('node-fetch');
var request = require('request'); // "Request" library

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

var client_id = 'c279ef65ab3548b18096c7d13f1819e4'; // Your client id
var client_secret = 'e3f00cef9c304a5db23fb1f126c2a55a'; // Your secret
var scope = 'user'

app.get('/', (req, res) => {
  // fetch()

});

app.post('/info', (req, res) => {


});


app.listen(3000, () => {
  console.log("App is listening on port 3000...");
});
const express = require('express');
const app = express();
const fs = require('fs');

const port = 8000;
const server = app.listen(port, listening);

function listening() {
    console.log('listening on port ' + port);
}

// Accept Apple or Ale
app.get('/fruit/A(pp)?le', function(request, response) {
    response.send('Apple or Ale?');
    console.log('Apple or Ale?');
})

app.get('/whoa/who+a+', function (request, response) {
    response.send('I know right?');
    console.log('I know right?');
})

app.get('/name/:fname/:lname', function(request, response) {
    const data = request.params;
    response.send(data.fname + ' ' + data.lname);
})

app.get('/word/:word', function(request, response) {
    const data = request.params;
    var dataArray = data.word.split("");
    response.send(dataArray.reverse().join(""));
})

app.get('/*', function(request, response) {
    response.send("It's the end of the road...");
})

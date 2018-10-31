console.log("Hello server");

const express = require("express");
const app = express();

const port = 8000;
const server = app.listen(port, listening);
// other ports

function listening() {
    console.log('listening on port ' + port);
}

app.get('/hello', sayHello);

function sayHello(request, response) {
    response.send("Hi, this is the /hello route")
};

app.get('/hi/:database', sayHi);

function sayHi(request, response) {
    const data = request.params;
    response.send('Hi ' + data.database + '. How are you?');
};asjkdh

// You can continue to chain your variables 
app.get('/hi/:name/:num', sayHitwo);

function sayHitwo(request, response) {
    const data = request.params;
    let numHi = "";
    for (let i = 0; i < data.num; i++) {
        numHi += 'Hi ' + data.name + ' How are you?';
    }
    response.send(numHi);
    
};

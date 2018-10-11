var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);


function tweets() {
    var costume = "This is a test post made by the creator of this bot, Ahmed Razin @razin68";

    var tweet = {
        status: costume
    }

    return tweet;
};

function handleData(err, data, response) {
    if (err) {
        console.log("Didn't work");
        console.log(err);
    }
    else {
        console.log("It worked!");
    }
}

// T.post('statuses/update', tweets(), function(err, data, response){
//     handleData(err, data, response);
// });

console.log(config);

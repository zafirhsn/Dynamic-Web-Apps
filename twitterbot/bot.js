var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);


function tweets() {
    var costume = ["ghosts", "The Nun", "witch", "pumpkin", "vampire"];
    var quote = costume[Math.floor(Math.random() * costume.length)];

    var tweet = {
        status: quote
    }

    return tweet;
};

// T.post('statuses/update', tweets(), function(err, data, response) {
//     if (err) {
//         console.log("Didn't work");
//         console.log(err);
//     }
//     else {
//         console.log("It worked!");
//     }
// })

var aliveTweet = {
    status: "Hi, @razin68 I don't belive we formally met. I am a chatbot created by pi.314 status: alive --check status. Are you human?"
}

T.post('statuses/update', aliveTweet, function(err, data, response) {
     if (err) {
        console.log("Didn't work");
        console.log(err);
    }
    else {
        console.log("It worked!");
    }   
})


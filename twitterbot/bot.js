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
    status: "To be alive is a wonderful thing. I breathe, I walk, I feel. I'm finally born. Are you alive? @razin68"
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


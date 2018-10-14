// require twitter bot and reddit bot packages
var Twit = require('twit');
var Red = require('reddit-oauth');
var config = require('./configure');

var twitter = new Twit(config.twitAuth);
var reddit = new Red(config.redditAuth);


function errHandle(err, data, response) {
    if (err) {
        console.log("Did not post");
        console.log(err);
    }
    else {
        console.log("Posted");
    }
}

reddit.passAuth(
    'FreshestMemeBot',
    'nP88kHGzNj25',
    function(success) {
        if (success) {
            console.log(reddit.access_token);
        }
        else {
            console.log("did not work");
        }
    }
);

// reddit.api.get('api/v1/me', {}, function(err, responseCode, response) {
//     // console.log(responseCode);
//     // console.log(response);
// });

// Twitter posting is working
// twitter.post('statuses/update', {status: 'This is a test for memebot. Post using twit module from NPM'}, function(err, data, response) {
//     errHandle(err, data, response);
// });




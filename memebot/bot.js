// require twitter bot and reddit bot packages
const Twit = require('twit');
const Red = require('snoowrap');
const config = require('./configure');

const twitter = new Twit(config.twitAuth);
const reddit = new Red(config.redditAuth);

const subList = ['memes', 'BikiniBottomTwitter', 'dankmemes', 'wholesomememes', 'MemeEconomy', 'BlackPeopleTwitter', 'WhitePeopleTwitter', 'me_irl', 'meirl']; 

function errHandle(err, data, response) {
    if (err) {
        console.log("Did not post");
        console.log(err);
    }
    else {
        console.log("Posted");
    }
}

reddit.ratelimitRemaining;

reddit.getSubmission('9o0sma').expandReplies({limit: Infinity, depth: Infinity}).then(console.log);


// reddit.getSubreddit('memes').

twitter.stream('' )

// Twitter posting is working
// twitter.post('statuses/update', {status: 'This is a test for memebot. Post using twit module from NPM'}, function(err, data, response) {
//     errHandle(err, data, response);
// });




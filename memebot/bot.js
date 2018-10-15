// require twitter bot and reddit bot packages
const Twit = require('twit');
const Red = require('snoowrap');
const config = require('./configure');

const twitter = new Twit(config.twitAuth);
const reddit = new Red(config.redditAuth);

const subList = ['memes', 'BikiniBottomTwitter', 'dankmemes', 'wholesomememes', 'MemeEconomy', 'BlackPeopleTwitter', 'WhitePeopleTwitter', 'me_irl', 'meirl'];
let topMemes = [];

function errHandle(err, data, response) {
    if (err) {
        console.log("Did not post");
        console.log(err);
    }
    else {
        console.log("Posted");
    }
}

// console.log(reddit.ratelimitRemaining);


// for (let i = 0; i < subList.length; i++) {
    reddit.getSubreddit(subList[0]).getTop({time: 'day'}).then(data => { topMemes[0] = { score: data[0].score, url: data[0].url, nsfw: data[0].over_18 }, console.log(topMemes[0])});
// }



// reddit.getSubreddit('memes').getTop({time: "day"}).length.then(
//     function(data) {
//         topMemes[0] = data;
//         console.log(topMemes[0]);
//     }
// );



// reddit.getSubreddit('memes').

//twitter.stream('' )

// Twitter posting is working
// twitter.post('statuses/update', {status: 'This is a test for memebot. Post using twit module from NPM'}, function(err, data, response) {
//     errHandle(err, data, response);
// });




// require twit for Twitter API, snoowrap for Reddit API, download-file for downloading img off reddit, config for API access info, and fs for filestream module
const fs = require('fs');
const download = require('download-file');
const Twit = require('twit');
const Red = require('snoowrap');
const config = require('./configure');

const twitter = new Twit(config.twitAuth);
const reddit = new Red(config.redditAuth);

//The list of subs the bot will traverse 
const subList = ['memes', 'BikiniBottomTwitter', 'dankmemes', 'wholesomememes', 'MemeEconomy', 'BlackPeopleTwitter', 'WhitePeopleTwitter', 'me_irl', 'meirl'];

//The top meme from each subreddit in subList
let topMemes = [];

// The very top meme post from all top memess from topMemes
let topPost = {};

// Counter to keep track of the most upvoted meme
let maxScore = 0;

// Error handling function for basic status update using twit
function errHandle(err, data, response) {
    if (err) {
        console.log("Did not post");
        console.log(err);
    }
    else {
        console.log("Posted");
    }
}

// Wrapper function for posting status updates 
function statusUpdate(Status) {
	twitter.post('statuses/update', { status: Status }, function(err, data, response) {
			errHandle(err, data, response);
	});
}

/*I could not figure out why this function isn't posting the images I want. The images are successfully downloaded to my machine, all paths are correct, console.log says "Media has uploaded", but it still does not show in my bot's TL. Only the status shows*/

// Upload media to twitter using function postMeme
function postMeme(path, altText, Status) {
	// Post media using path of the img/video from local machine
	twitter.post( 'media/upload', { media_data: path }, function(err, data, response) {
		// attributes that need to be passed in order to upload
		var mediaIdStr = data.media_id_string;
		var meta_params = { media_id: mediaIdStr, alt_text: { text: altText} }

		// We're now referencing the media and going to create a status to go along with it
		twitter.post('media/metadata/create', meta_params, function (err, data, response) {
				if(!err) {
						var params = {status: Status, media_id: [mediaIdStr] }
						// Let's post a status using params as the status object
						twitter.post('statuses/update', params, function(err, data, response) {
								console.log(data);
								console.log("Media has uploaded");
						});
				}
		});
	});
}

/* How can I compare all the top posts in the list of subreddits and then use topPosts later? I need to make sure that topPost has the correct data before I use it later in my code. Only way to do that is to use topPost once all the requests come back from Reddit. And I can make sure that happens by creating a promise */
var memePromise = new Promise(function(resolve, reject) {
	for (let i = 0; i < subList.length; i++) {
		reddit.getSubreddit(subList[i]).getTop({time: 'day'}).then(
			function(data) { 
					topMemes[i] = {title: data[0].title, sub: data[0].subreddit.display_name, score: data[0].score, url: data[0].url, nsfw: data[0].over_18};
					// console.log(topMemes[i]);
					if (topMemes[i].score > maxScore && !(topMemes[i].nsfw)) {
						topPost = topMemes[i];
						console.log(topPost.score);
						maxScore = topMemes[i].score;
					}

					if (i === subList.length - 1) { 
						resolve(topPost);
					}
				});
		}
});

// Once all the requests come back, we can use topPost
memePromise.then(function(data) {
	console.log(data);

	// The url where the image of the top post lives
	var url = data.url; 

	// The file name we will use to save the image to our local machine, the regular expresssion on the right makes sure that no punctuation is in the filename, or else Windows will not save the file
	var file_name = data.title.replace(/[\ : * ? " ' < > |]/g, "");

	// Path of save dest.
	var options = {
		directory: "./",
		filename: file_name + '.jpg'
	}	

	// Package does its magic
	download(url, options, function(err) {
		if (err) throw err 
		console.log("Saved image");

		// Read from our saved file
		var memePath = fs.readFileSync('./' + file_name + '.jpg', { encoding: 'base64'});

		// Post the url for the meme and the subreddit it came from
		postMeme(memePath, data.title, "Top meme of the day comes from r/" + data.sub + " " + data.url);

		// console.log(memePath);

	});

});


	
	
	
	// var memePath = '/Users/Zafir/Dynamic-Web-Apps/memebot/' + file_name + '.jpg';
	// console.log(memePath);

	
	/* 						
		twitter.postMediaChunked( {file_path: memePath}, function(err, data, response) {
		console.log(data);
		console.log("Media uploaded using mediachunk API");
		var params = { status: "Fourth time's the charm...please"};
		var meta_params = { media_id: data.media_id_string, alt_text: { text: "This is a pic" }};
		
		twitter.post('media/metadata/create', meta_params, function(err, data, response) {
			if (!err) {
				twitter.post('statuses/update', params, function(err, data, ressponse) {
					console.log(data);
				});
			}
		});
	}); 
	*/

	// postMeme(memePath, "pic", "Second meme of the day");


//         		});

//         });
// }


/* Streaming is working. I am able to listen for tweets @ my bot and will be able to reply soon. Update: this is functionality I did not have time to implement because of problems I faced uploading media to twitter :(*/
// var stream = twitter.stream('statuses/filter', { track: 'FreshestMemeBot' } )
// stream.on('tweet', function(tweet) {
//     console.log(tweet);
// });






# MemeBot
@FreshestMemeBot is a Twitter bot that uses Reddit's API to find the most upvoted memes within a list of pre-determined subreddits. The bot will then tweet the meme onto twitter. 

### Installation

@FreshestMemeBot requires [Node.js](https://nodejs.org/) to run.

### Download Repository
Download bot.js, config.js, stream.js from [the memebot repository](https://github.com/zafirhsn/Dynamic-Web-Apps/tree/master/memebot). Place both files into a folder on your computer and name the folder *memebot*

### Node.js Packages Required
*remember to install packages into the directory where bot.js lives*

| Package | Install |
| ------ | ------ |
| twit | ``` $ npm i twit  ``` |
| snoowrap | ```$ npm i snoowrap ``` |
| download-file | ``` $ npm i download-file ``` |

### Setting up Twitter API and Reddit API accounts
Follow the instructions in the following links in order to create developer accounts on Twitter and Reddit.
Reddit: https://www.reddit.com/wiki/api
Twitter: https://developer.twitter.com/en.html 

### Configure.js
Use your credential information to fill in the fields within configure.js

```sh
module.exports.redditAuth = {

        user_agent: 'DESCRIPTION OF YOUR BOT',
        clientId: 'YOUR CLIENT ID', 
        clientSecret: 'YOUR CLIENT SECRET',
        username: 'YOUR REDDIT USERNAME',
        password: 'YOUR REDDIT PASSWORD',
}

module.exports.twitAuth = {
        consumer_key: 'YOUR CONSUMER KEY',
        consumer_secret:  'YOUR CONSUMER SECRET',
        access_token: 'YOUR ACCESS TOKEN',
        access_token_secret: 'YOUR ACCESS TOKEN SECRET',
        timeout_ms: 60*1000, 
        strictSSL: true
}
```
## To Run
run this command from your memebot directory
```sh
$ node bot.js
```

## Final Step
Pay the $5,000,000 licensing fee :) 

# spotifyapp
spotifyapp is an Express app that allows users to see their top tracks and artists of the last 6 months from Spotify. This app does not store any of your user data from Spotify.

## To Install
Download this repository as a zip file. Un-zip the repo wherever you'd like on your local machine. 

### Spotify Developer Account
You will need to create a Spotify Developer account in order to obtain a client secret and client ID to use with this app. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) in order to log into your Spotify account. Then go to [Developer Docs](https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app) in order to register your app and get your client ID and secret. In the step that says, "Whitelist a Redirect URI" enter "http://localhost:3000/info" as the redirect URI. 

### Client Secret and Client ID
Go into your local spotifyapp directory and open app.js in your favorite text editor. Edit line **15** and **16**, replacing these lines with your client ID and secret

```
15| const client_id = 'YOUR CLIENT ID'; // Your client id
16| const client_secret = 'YOUR CLIENT SECRET'; // Your secret
```

### Install Dependencies
Go into your terminal, cd into your local spotifyapp and run this command

```
$ npm install
```

## To Run 
Run this command from within the spotifyapp directory

```
$ node app.js
```

Then, go to [http://localhost:3000/](http://localhost:3000/)

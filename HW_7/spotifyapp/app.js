const app = require('express')();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const request = require('request'); // "Request" library
const querystring = require('querystring'); // To pass certain parameters in our request header  
const cookieParser = require('cookie-parser'); // To store the random generated state as a key/value pair in a cookie and then check that state after the redirect back to my app in order to make sure its the same random string

app.set('view engine', 'ejs');
// Middleware needs these 'use' statements
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

const client_id = 'YOUR CLIENT ID'; // Your client id
const client_secret = 'YOUR CLIENT SECRET'; // Your secret
const redirecturi = 'http://localhost:' + port + '/info';

// The scope of info I need from the user (I need to read their top tracks/artists)
const scope = 'user-top-read';

let access_token;
let refresh_token;

// To create random state string
function randomString(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// Key for the state when we store it in a cookie
let stateKey = 'spotify_auth_state';


app.get('/', (req, res) => {
  res.render('index');
  
  // Create state string
  // var state = randomString(16);

  // // Store key/value pair as cookie to be accessed later
  // res.cookie(stateKey, state);

  // // Redirect user to authorize use of their info
  // res.redirect('https://accounts.spotify.com/authorize?' + 
  //   // Very useful module
  //   querystring.stringify({
  //     response_type: 'code',
  //     client_id: client_id,
  //     scope: scope,
  //     redirect_uri: redirecturi,
  //     state: state
  //   }));
  
});

// Redirect user to this page after authorization
app.get('/info', (req, res) => {

  // Get the code and state sent back to me
  var code = req.query.code;
  var state = req.query.state;
  var storedState = req.cookies ? req.cookies[stateKey]: null;
  // console.log(storedState);

  // Check if state is same as when I sent it
  if (state === null || state !== storedState) {
    res.send('Error, state mismatch');
  }
  else {
    res.clearCookie(stateKey);

    // Make request for access token
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirecturi,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // Access token and refresh token granted, token lasts 1 hour
        access_token = body.access_token;
        console.log(access_token);
        refresh_token = body.refresh_token;
        console.log(refresh_token);
      }
    });
    res.render('home', { items: [ ] , type: ''});
  }  
});

// Use accesss tokens to make requests when user clicks the appropriate button
app.post('/info', (req, res) => {

  let options = {
    url: 'https://api.spotify.com/v1/me/top/',
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
    json: true
  };

  if (typeof req.body['top-tracks'] !== 'undefined') {
    options.url = 'https://api.spotify.com/v1/me/top/tracks?' + 
    querystring.stringify({
      time_range: 'medium_term',
      limit: '10',
      offset: '0'
    });

    request.get(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        console.log(options.url);
        // res.send(body.items);
        res.render('home', { items: body.items, type: 'top-tracks'} );
      
      }
      else {
        // console.log(response);
      }
    });
    console.log('User clicked top-tracks');
  }

  else if (typeof req.body['top-artists'] !== 'undefined') {
    options.url = 'https://api.spotify.com/v1/me/top/artists?' + 
    querystring.stringify({
      time_range: 'medium_term',
      limit: '10',
      offset: '0'
    });

    request.get(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        console.log(body);
        // res.send(body);
        res.render('home', { items: body.items, type: 'top-artists'} );
      
      }
      else {
        // console.log(response);
      }
    });
    console.log('User clicked top-artists');
  }
});


app.listen(port, () => {
  console.log("App is listening on port " + port + "...");
});
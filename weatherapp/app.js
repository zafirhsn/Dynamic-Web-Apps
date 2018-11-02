const app = require('express')();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.render('index', {data: 'No city selected' });
});

app.post('/', (req,res) => {
    fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + req.body.city.toLowerCase() + ',us&mode=json&appid=ab07d2f249b980cdc7c23e52beaab095').then(res => res.json()).then(function(data) {
        res.render('index', {data: data.list[0].main.temp});
        console.log(data.list[0].main.temp);
        console.log((data.list[0].main.temp - 273.15)* (9.0/5.0) + 32);
    });
      
    //http://api.openweathermap.org/data/2.5/forecast?q=london,us&mode=json&appid=ab07d2f249b980cdc7c23e52beaab095
    console.log(req.body.city);
});

app.listen(3000, () => {
    console.log("App is listening on port 3000...");
})
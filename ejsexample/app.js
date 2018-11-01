const app = require('express')();
const ejs = require('ejs');

app.set('view engine', 'ejs');


var data = {
    groceries: [{
        store: 'Acme',
        list: [
            'strawberries',
            'blueberries',
            'yogurt'
        ]
        }, {
        store: 'Corner Market',
        list: [
            'baguette',
            'basil',
            'tomatoes',
            'corn'
        ]
        }]
};
// app.get('/date', (req, res) => {
//     res.render('index')
// });

app.get('/', (req, res) => {
    res.render('index', { groceries: data.groceries});
});

app.listen(3000, function(){
    console.log("App is listening on port 3000...");
});
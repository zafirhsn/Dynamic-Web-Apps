const app = require('express')();

const data =    { 
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
        'tomatoes'
    ]
    }]
};

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home', { posts: data })
});
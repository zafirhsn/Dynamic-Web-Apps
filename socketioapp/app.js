const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// const http = require('http').Server(app);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (data) => {
    console.log('A user connected');
    data.on('disconnect', () => {
        console.log('User disconnected');
    });
    data.on('chat message', (msg)=> {
        console.log(msg);
    });
    
});

// app.listen(3000, () => {
//     console.log('Server is listening on port 3000');
// });

http.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

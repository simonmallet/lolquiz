var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('user connected', socket.id);
    io.emit('system chat message', 'user ' + socket.id + ' connected!');

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    });

    socket.on('disconnect', function(){
        io.emit('system chat message', 'user ' + socket.id + ' disconnected!');

        console.log('user disconnected', socket.id);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
var app = require('express') ();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/',function(req,res){
    res.sendFile('index.html', { root: '.' });
});

//whenever someone connects to the page this will execute
io.on('connection', function(socket){
    // console.log('A user connected');
    //sends a message after a timeout of 4 seconds
    // setTimeout(function(){
    //     socket.send('A message 4seconds after connection!!!');
    // },4000);

    // ---> Custom event instead of a message <---
    // setTimeout(function(){
    //     // Sending an object when emmiting an event
    //     socket.emit('testerEvent', { description : 'A custom event named testerEvent!!!'});
    // },4000);

    // ---> Sending an event from the Client <---
    // socket.on('clientEvent', function(data){
    //     console.log(data);
    // });

    //whenever someone disconnects this will execute
    // socket.on('disconnect', function(){
    //     console.log('A user disconnected');
    // });

    // ---> Broadcast the number of connected clients to all users an event from the Client <---
    var clients = 0;
    // io.on('connection', function(socket){
    //     clients++;
    //     io.sockets.emit('broadcast', { description : clients + 'clients connected!!!'});
    //     socket.on('disconnect', function(){
    //         clients--;
    //         io.sockets.emit('broadcast', { description : clients + 'clients connected!!!'});
    //     });
    // });

    // ---> Welcome message to client <---
    io.on('connection', function(socket){
        clients++;
        socket.emit('newclientconnect', {description : 'Hey, Welcome!' });
        socket.broadcast.emit('newclientconnect', {description : clients + 'clients connected!!!'});
        socket.on('disconnect', function(){
            clients--;
            socket.broadcast.emit('newclientconnect', {description : clients + 'clients connected!!!'});
        });
    });
})

http.listen(3000, function(){
    console.log('server running');
}) 
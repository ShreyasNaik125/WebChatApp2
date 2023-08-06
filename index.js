const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs');
app.use(express.static(__dirname + '/static'));

app.get('/',(req,res) => {
    res.render('index');
})

io.on('connection',(socket) => {
    socket.on('User-joined',username => {
        console.log(username + ' joined the chat')

        socket.on('msgrecv',data => {
            socket.emit('displayOut',{user:data.username,message:data.msg})
            socket.broadcast.emit('displayIn',{user:data.username,message:data.msg})
        })

    })
})

server.listen(3000,() => {
    console.log('running on port 3000*');
})

//socket.io
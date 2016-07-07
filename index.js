var express = require('express');
var app = require('express')();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(path.join(__dirname, 'public')));
app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});
var socketids = new Array;
io.on('connection',function(socket){
	//console.log('a user connected');
	// socket.on('disconnect', function(){
 //    	console.log('user disconnected');
 //  	});
  	socket.on('msg', function(msg){

    	console.log(msg);
    	socket.broadcast.emit('hi',msg);
    	for(var i = 0;i<socketids.length;i++)
    	{
    		if(msg.name == socketids[i].name)
    		{
    			socket.broadcast.to(socketids[i].socketid).emit('msg',msg.from+':'+msg.message);
    		}
    	}
  	});
  	socket.on('join', function(msg){
  		socketids.push({
        name: msg,
        socketid: socket.id
    	});
    	console.log(socketids);      
  	});
})
http.listen(3000,function(){
	console.log('listening on *:3000');
})
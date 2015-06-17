var express = require("express");
var bodyParser = require("body-parser");
var database = require("./database");

var net = require('net');
var jsonSocket = require('json-socket');

var port = 4501;
var server = net.createServer();

var app = express();

app.use(function(req,res,next){
    
    console.log(req.method);
    next();
    
});

app.use('/',express.static(__dirname + '/public'));   //Handles all static files in path

app.use(bodyParser());

app.get("/room", function(req,res){
    
    database.getRooms(req,res);
});

app.post("/new", function(req,res){
   
    var room = {
        
	name:req.body.name,
	temperature:req.body.temperature,
	time:req.body.time
    }
    
    database.insertRoom(room,req,res);
    
    //console.log("post method for /new path");
    //console.log(req.body);
    //res.send("ok");
    
});

app.listen("4500");

server.listen(port);
server.on('connection', function(socket) {

	socket = new jsonSocket(socket);
	socket.on('message', function(message) {

		//var result = message.name + message.b;
		console.log(message);
		var result = database.insertRoom_over_tcp(message);
		socket.sendEndMessage({result: result});
	});
});

var mongoose = require("mongoose");
var uri = "mongodb://localhost/test";

mongoose.connect(uri,function(err,succ){
    
    if(err){
        console.log("Could not connect");
    }
    else{
        console.log("Connected to db");
    }
});

var roomSchema = mongoose.Schema;

var room = new roomSchema({

	name:String,
	temperature:String,
	date:String

});

//Room model uses roomSchema structure
//Mongoose also creates a MongoDB collection called Rooms for these documents.

var Room = mongoose.model("Room", room);

exports.insertRoom = function(room,req,res){
    
	var tmp = new Room();
	tmp.name = room.name;
	tmp.temperature = room.temperature;
	tmp.time = room.time;
    
	tmp.save(function(err){
		console.log(err);
	});

	res.redirect("/");
}

exports.getRooms = function(req,res){

	Room.find().exec(function(err,data){
    
		console.log(err);  //ignored
		console.log(data);
		res.send(data);
	});
}

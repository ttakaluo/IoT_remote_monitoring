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

var Schema = mongoose.Schema;

var sauna = new Schema({
    
    temperature:String,
    time:String
});

var Sauna = mongoose.model("Sauna", §sauna);

exports.insertSauna = function(sauna,req,res){
    
    var tmp = new Sauna();
    tmp.temperature = sauna.temperature;
    tmp.time = sauna.time;
    
    tmp.save(function(err){
        console.log(err);
    });
    
    //res.send("Sauna Added");
    res.redirect("/");
}

exports.getSauna = function(req,res){

    Sauna.find().exec(function(err,data){
    
        console.log(err);  //ignored
        console.log(data);
        res.send(data);
    });
}

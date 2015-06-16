var express = require("express");
var bodyParser = require("body-parser");
var database = require("./database");
var app = express();

app.use(function(req,res,next){
    
    console.log(req.method);
    next();
    
});

app.use('/',express.static(__dirname + '/public'));   //Handles all static files in path

app.use(bodyParser());

app.get("/sauna", function(req,res){
    
    database.getSaunas(req,res);
});

app.post("/new", function(req,res){
   
    var sauna = {
        
        temperature:req.body.temperature,
        time:req.body.time
    }
    
    database.insertSauna(sauna,req,res);
    
    //console.log("post method for /new path");
    //console.log(req.body);
    //res.send("ok");
    
});

app.listen("4500");


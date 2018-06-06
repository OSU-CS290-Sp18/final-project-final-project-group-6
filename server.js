var express = require('express');
var MongoClient = require('mongodb').MongoClient;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB;

var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword + '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName; 
var mongoDBDatabase;


var app = express();
var port = process.env.PORT || 3000; 

console.log(mongoURL); 
app.use(express.static('public')); 

app.get('/', function (req, res, next) {
    var recipes = mongoDBDatabase.collection('recipes');
    var recipeCursor = recipes.find({}).project({'ingredients': 1}); 

    recipeCursor.toArray(function (err, recipeDocs) {
        if(err){
            res.status(500).send("Error fetching from DB");
        } else {
            console.log(recipeDocs);
        }
    });
});

MongoClient.connect(mongoURL, function (err, client) {
    if(err){
        throw err;
    }
    db = mongoDBDatabase = client.db(mongoDBName);
    app.listen(port, function () {
        console.log("server listening on port", port); 
    }); 
});



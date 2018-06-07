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
 
var ingredientsArray; 

console.log("connected to DB: ", mongoURL); 

//logger, here for debugging
app.use(function (req, res, next) {
    console.log(req.method, " request made at: ", req.url);
    next();
});


app.get('/search/:ingredient', function (req, res, next){
    console.log("Ingredient searched: ", req.params.ingredient);
  
    //TODO 
    //temporary, need to search all ingredients from all recipes
    if(ingredientsArray[0].ingredients.indexOf(req.params.ingredient) != -1){
          res.status(200).send(req.params.ingredient);
    } else {
       res.status(404);
       next();
    } 
});

//need to load database before anything else happens
app.use('/home.html', function (req, res, next) {
    var recipes = mongoDBDatabase.collection('recipes');
    var ingredientCursor = recipes.find({}).project({'ingredients': 1, _id: 0}); 

    ingredientCursor.toArray(function (err, recipeDocs) {
        if(err){
            res.status(500).send("Error fetching from DB");
        } else {
            ingredientsArray = recipeDocs;
            next();
       }
    });

});

app.use(express.static('public')); 

MongoClient.connect(mongoURL, function (err, client) {
    if(err){
        throw err;
    }
    db = mongoDBDatabase = client.db(mongoDBName);
    app.listen(port, function () {
        console.log("server listening on port", port); 
    }); 
});



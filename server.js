var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var sessionStorage = require('sessionstorage'); 

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
var recipes;
var ingredientCursor; 

console.log("connected to DB: ", mongoURL); 

//logger, here for debugging
/*app.use(function (req, res, next) {
    console.log(req.method, " request made at: ", req.url);
    next();
});*/


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

var generatedRecipes; 

app.get('/recipesWith/:ingredients', function (req, res, next){
    var ingredients = req.params.ingredients.split(',');
    console.log("Ingredient names: ", ingredients);

    var namesCursor = recipes.find({"ingredients": {$in: ingredients}}).project({"name" : 1, _id: 0});  

    var validRecipes; 

    namesCursor.toArray(function (err, nameDocs) {
        if(err){
            res.status(500).send("Error fetching from DB");
        } else {
            console.log(nameDocs);

            generatedRecipes = []; 

            for(var i = 0; i < nameDocs.length; i++){
                generatedRecipes[i] = nameDocs[i].name;
            } 

            /*
            console.log("Valid recipes are: ", validRecipes);
            
            var generatedRecipeNamesCSV = "";

            for(var i = 0; i < validRecipes.length - 1; i++){
                generatedRecipeNamesCSV += validRecipes[i] + ",";
            }

            generatedRecipeNamesCSV += validRecipes[validRecipes.length - 1]

            console.log("generatedRecipeNames: ", generatedRecipeNamesCSV);  
            //sessionStorage.setItem("generatedRecipeNames", "generatedRecipeNamesCSV"); 
            res.status(200).send(generatedRecipeNamesCSV);*/


       }
    });
 
});

app.get('/genRecipe.html', function(req, res, next){

    if(generatedRecipes){
        var generatedRecipeNamesString = "";

        for(var i = 0; i < generatedRecipes.length - 1; i++){
            generatedRecipeNamesString += generatedRecipes[i] + ",";
        }

        generatedRecipeNamesString += generatedRecipes[generatedRecipes.length - 1]


        res.status(200).send(generatedRecipeNamesString);
    } else{
        next();
    }
}); 

//need to load database before anything else happens
app.use('/home.html', function (req, res, next) {
    recipes = mongoDBDatabase.collection('recipes');
    ingredientCursor = recipes.find({}).project({'ingredients': 1, _id: 0}); 

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

app.get('*', function (req, res) {
        res.status(404);
        res.send("The page you requested doesn't exist");
});

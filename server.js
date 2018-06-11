
var path = require('path');
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var exphbs = require('express-handlebars');

//These are environment variables
//The server will not start up properly if they are not set
//Can manually enter them in this file instead, just don't push that info to GitHub
var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB;

var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword + '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;
var mongoDBDatabase;

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var ingredientsArray = [];
var recipes;
var ingredientCursor;
//var generatedRecipes;

console.log("Attempting to connect to DB: ", mongoURL);

//logger, here for debugging
/*app.use(function (req, res, next) {
    console.log(req.method, " request made at: ", req.url);
    next();
});*/


app.get('/search/:ingredient', function (req, res, next){
    console.log("Ingredient searched: ", req.params.ingredient);

    //Checks if the ingredient exists in the DB
    if(ingredientsArray.indexOf(req.params.ingredient) != -1){
          res.status(200).send(req.params.ingredient);
    } else {
       res.status(404);
       next();
    }
});

//Get request that is created when user clicks generate button on the main page
app.get('/recipesWith/:ingredients', function (req, res, next){

    //Turn the parameter string into an array of the ingredient names
    var ingredients = req.params.ingredients.split(',');
    console.log("Searching for recipes with ingredient names: ", ingredients);

    //Searches database to find any recipe that contains one or more of the ingredients entered by the user
    var namesCursor = recipes.find({"ingredients": {$in: ingredients}}).project({"name" : 1, _id: 0});

    //namesCursor is a database object, this attempts to turn it into an array
    namesCursor.toArray(function (err, nameDocs) {
        if(err){
            res.status(500).send("Error fetching from DB");
        } else {
            //console.log(nameDocs);

            var generatedRecipes = []; //reset the array in case it has values in it for some reason (should not happen)

            //store the recipes which match the user's ingredients in array for use later
            for(var i = 0; i < nameDocs.length; i++){
                generatedRecipes[i] = nameDocs[i].name;
            }

            var generatedRecipeNamesString = "";

            for(var i = 0; i < generatedRecipes.length - 1; i++){
                generatedRecipeNamesString += generatedRecipes[i] + ",";
            }

            generatedRecipeNamesString += generatedRecipes[generatedRecipes.length - 1]


            res.status(200).send(generatedRecipeNamesString);

       }
    });

});

//Monica's page
app.get('/genRecipe/:recipeNames', function(req, res, next){

   //Monica you will need to use this info to generate your page dynamically
    console.log("generated recipe names are: ", req.params.recipeNames);
    //res.status(200).send(req.params.recipeNames);

    var recipeNames = req.params.recipeNames.split(',');

    //console.log(recipeNames);

    //find full recipes for sent recipes
    var selectedRecipes = recipes.find({"name": {$in: recipeNames}}).project({_id: 0});

    //change to array for handlebars to use
    selectedRecipes.toArray(function(err, recipesJSON) {
      if(err){
        res.status(500).send("Error fetching from database.");
      } else { //render page with recipes in handlebars = selectedRecipes array
        console.log(recipesJSON);
      }
    })
});

//need to load database before anything else happens
app.use('/home.html', function (req, res, next) {
    recipes = mongoDBDatabase.collection('recipes');
    ingredientCursor = recipes.find({}).project({'ingredients': 1, _id: 0});

    //Gets an array of all the ingredient names and stores it server side
    //This is all very hacky right now
    //I'm sure there is a better way to do it
    ingredientCursor.toArray(function (err, recipeDocs) {
        if(err){
            res.status(500).send("Error fetching from DB");
        } else {

            console.log(recipeDocs[0].ingredients.length);
            var index = 0;
            for(var i = 0; i < recipeDocs.length; i++){
                for(var j = 0; j < recipeDocs[i].ingredients.length; j++){
                    ingredientsArray[index] = (recipeDocs[i].ingredients)[j];
                    index += 1;
                }
            }

            console.log("All ingredients: ", ingredientsArray);
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
        console.log("server listening on port ", port, " (successfully connected to DB)");
    });
});

app.get('*', function (req, res) {
        res.status(404);
        res.send("The page you requested doesn't exist");
});

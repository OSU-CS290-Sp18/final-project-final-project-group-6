/*
Server code for recipeFinder
To use: set environment variables with the names below

Author: Alex Grejuc
*/

//Ensure these dependencies are all installed in node_modules
//These can be installed by running npm install (assuming you have the package.json from this repo)
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
var db; //the database

var app = express();
var port = process.env.PORT || 3000; //use environment variable if set

var ingredientsArray = [];
var recipes; //all of the recipes from the DB
var generatedRecipes; //only the recipes that match the user-entered ingredients

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

console.log("\n=== Attempting to connect to DB: ", mongoURL, "===");

//This is triggered when a user enters an ingredient on the main search bar
app.get('/search/:ingredient', function (req, res, next){
    console.log("\n=== Ingredient searched: ", req.params.ingredient, " ===");

    //Checks if the ingredient exists in the DB
    if(ingredientsArray.indexOf(req.params.ingredient) != -1){
        res.status(200).send(req.params.ingredient);
    } else {
       res.status(404).send();
    }
});

//Get request that is created when user clicks generate button on the main page
app.get('/recipesWith/:ingredients', function (req, res, next){

    //Turn the parameter string into an array of the ingredient names
    var ingredients = req.params.ingredients.split(',');
    console.log("\n===Searching for recipes with ingredient names:\n", ingredients, "\n===");

    //Searches database to find any recipe that contains one or more of the ingredients entered by the user
    var recipeCursor = recipes.find({"ingredients": {$in: ingredients}}).project({_id: 0});

    //namesCursor is a database object, this attempts to turn it into an array
    recipeCursor.toArray(function (err, recipes) {
        if(err){
            res.status(500).send("Error fetching from DB");
        } else {
            generatedRecipes = [];
            var recipeScores = [];

            //This is quick and dirty
            //Needs to be cleaned up and refactored
            recipes.forEach(function (element) {
                var score = 0;

                element.ingredients.forEach(function (ingredient){
                        if(ingredients.indexOf(ingredient) >= 0){
                            score++;
                        }
                        else {
                            score--;
                        }
                });

                recipeScores.push({"recipe": element, "score": score});
            });

            recipeScores.sort(function(a, b){
                if(a.score > b.score) return -1;
                else if(b.score > a.score) return 1;
                else return 0;
            });

            console.log("\n=== scored recipes as follows:\n", recipeScores, "\n===");
            for(var i = 0; i < recipeScores.length && i < 10 ; i++){
                generatedRecipes[i] = recipeScores[i].recipe;
            }

            console.log("\n=== Using the following (should be 10 or fewer) recipes:\n", generatedRecipes, "\n===");

            res.status(200).send(); //index.js listens for this and routes to genRecipe when received
       }
    });

});

//Automatically routes here after the recipes are generated
//Routed via the javascript in index.js following a 200 response from the server
app.get('/genRecipe', function(req, res, next){

  //This is just for printing to the console
  var names = "";

  generatedRecipes.forEach(function(element){
      names += element.name + ", ";
  });
  names = names.slice(0, -2); //remove the last comma so it doesn't seem like a recipe is missing

  console.log("\n=== Server generating genRecipe page with the following recipes:\n", names, "\n===");
  res.status(200).render('genRecipe', {
    recipes: generatedRecipes
  });
});

//This should render the recipe Details page
//Monica you should route to this page from yours
//You can do this either by sending a GET request from within your JS
//Or you can make every recipe a link to /recipeDetails/<name> with its corresponding name
//Max you should set the inside of this function to render your page
//recipeObject will contain a JavaScript object which can be used to render a page
//(see Monica's example of that in the above middleware)
app.get('/recipeDetails/:recipeName', function(req, res, next){
    generatedRecipes.find(function(recipeObject) {
        if(recipeObject.name == req.params.recipeName) {
            console.log("\n=== Rendering recipe details with:\n", recipeObject, "\n===");
            res.status(200).render('fullRecipePage', {
                name: recipeObject.name,
                photoURL: recipeObject.photoURL,
                ingredients: recipeObject.ingredients,
                time: recipeObject.time,
                directions: recipeObject.directions,
                link: recipeObject.link,
                courtesyOf: recipeObject.courtesyOf
            });
        }

    });
});

//need to load database before anything else happens
app.use('/home.html', function (req, res, next) {
    recipes = db.collection('recipes');
    var ingredientCursor = recipes.find({}).project({'ingredients': 1, _id: 0});

    //Gets an array of all the ingredient names and stores it server side
    //This is all very hacky right now
    //I'm sure there is a better way to do it
    ingredientCursor.toArray(function (err, recipeDocs) {
        if(err){
            res.status(500).send("Error fetching from DB");
        } else {
            var index = 0;
            for(var i = 0; i < recipeDocs.length; i++){
                for(var j = 0; j < recipeDocs[i].ingredients.length; j++){
                    ingredientsArray[index] = (recipeDocs[i].ingredients)[j];
                    index += 1;
                }
            }


            ingredientsArray = ingredientsArray.sort();

            //remove duplicates
            //probably not efficient
            ingredientsArray = ingredientsArray.filter(function(elem, index, arr) {
                    return index === arr.indexOf(elem);
            });


            console.log("\n=== Server got the following ingredients list from the DB:\n", ingredientsArray, "\n===");
            next();
       }
    });

});

app.use(express.static('public'));

MongoClient.connect(mongoURL, function (err, client) {
    if(err) throw err;

    db = client.db(mongoDBName);

    app.listen(port, function () {
        console.log("\n=== Server listening on port ", port, " (successfully connected to DB)", "===");
    });
});

//It would be nice to have an appropriately-styled 404 page, but it's not necessary
app.get('*', function (req, res) {
        res.status(404);
        res.send("The page you requested doesn't exist");
});

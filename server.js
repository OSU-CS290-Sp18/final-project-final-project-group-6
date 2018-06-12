/******************************************************************************
** 
** Server code for recipeFinder
** 
**          ** Must be on OSU VPN or OSU network to access MongoDB database **
**
**
** To use: 
**          set environment variables with the names below 
**          run "npm install" to install necessary modules
**          run "npm start" to run normally (also compiles handlebars)
**          run "npm run dev" to run with nodemon (also compiles handlebars) 
**
**       
******************************************************************************/

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
var recipesMongoObject; //all of the recipes from the DB
var generatedRecipes; //only the recipes that match the user-entered ingredients
var allRecipesArray;

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

console.log("\n=== Attempting to connect to DB: ", mongoURL, "===");

// This will first attempt to connect to DB
// Server eventually crashes if DB connection takes too long / does not work 
MongoClient.connect(mongoURL, function (err, client) {
    if(err) throw err;

    db = client.db(mongoDBName);

    //We only get to this point if there is no err
    //Server will not start running w/o DB which is what we want 
    app.listen(port, function () {
        console.log("\n=== Server listening on port ", port, " (successfully connected to DB)", "===");
    });
});

//When user first loads the page this will create arrays of the recipes and ingredients 
app.use('/home.html', function (req, res, next) {
    recipesMongoObject = db.collection('recipes');

    var recipesCursor = recipesMongoObject.find({}).project({_id: 0});

    recipesCursor.toArray(function(err, allRecipes){
        if(err){
            res.status(500).send("Error fetching from DB");
        }
        else{
            
            allRecipesArray = allRecipes; 

            //make an array of ingredients 
            allRecipesArray.forEach(function (element){
                element.ingredients.forEach(function (ingredient){
                    ingredientsArray.push(ingredient);
                });

             });

            ingredientsArray.sort();

            //remove duplicates
            //probably not efficient
            ingredientsArray = ingredientsArray.filter(function(elem, index, arr) {
                    return index === arr.indexOf(elem);
            });


            console.log("\n=== Server got the following ingredients list from the DB:\n", ingredientsArray, "\n===");
            next();
        }});

});

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
    var recipeCursor = recipesMongoObject.find({"ingredients": {$in: ingredients}}).project({_id: 0});

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

//This will render the recipe details page
//Can either route here by clicking on a recipe tile on the genRecipe page
//Or by directly entering the URL
app.get('/recipeDetails/:recipeName', function(req, res, next){

    var found = 0; 

    allRecipesArray.find(function(recipeObject) {
        if(recipeObject.name == req.params.recipeName) {
            console.log("\n=== Rendering recipe details with:\n", recipeObject, "\n===");
            res.status(200).render('fullRecipePage', {
                name: recipeObject.name,
                photoURL: recipeObject.photoURL,
                ingredientsLong: recipeObject.ingredientsLong,
                time: recipeObject.time,
                directions: recipeObject.directions,
                link: recipeObject.link,
                courtesyOf: recipeObject.courtesyOf
            });

           found = 1;  
        }

    });
     
    if(!found) next(); 
});


app.use(express.static('public'));

//It would be nice to have an appropriately-styled 404 page, but it's not necessary
app.get('*', function (req, res) {
        res.status(404);
        res.send("The page you requested doesn't exist");
});

// This is a very quickly-created way to add recipes to the DB
// Add your recipes as objects
// Put them in the myRecipes array of objects
// Very carefully check that you created your objects correctly
// Once you run the script, your mistakes will be on the DB
// Run the script with node addToDB.js
// Please double check that you added correctly  


var MongoClient = require('mongodb').MongoClient;

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

//You shouldn't need to touch this
MongoClient.connect(mongoURL, function (err, client) {
    if(err){
        throw err;
    }
    mongoDBDatabase = client.db(mongoDBName);
    console.log("connected to database");

    var recipes = mongoDBDatabase.collection("recipes");

    recipes.insertMany(myRecipes, function (err, res) {
       if (err) throw err;
       console.log("inserted recipes");
    });
});

//You can use this as a template; fill it out with recipe info
/*
var myRecipe = {
    "name":
    "ingredients":
    "time":
    "courtesyOf":
    "link":
    "photURL":
    "directions":
    "ingredientsLong":
}*/


//This is an example
var guacamole = {
    "name": "guacamole",
    "ingredients": ["avocados", "lime", "salt", "cumin", "cayenne", "onion", "jalapeno", "tomatoes", "cilantro", "garlic"],
    "time": "80",
    "courtesyOf": "Alton Brown",
    "link": "https://www.foodnetwork.com/recipes/alton-brown/guacamole-recipe-1940609",
    "photURL": "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/4/7/0/EA1F08_guacamole_s4x3.jpg.rend.hgtvcom.616.462.suffix/1382539889071.jpeg",
    "directions": [
      "In a large bowl place the scooped avocado pulp and lime juice, toss to coat. Drain, and reserve the lime juice, after all of the avocados have been coated. Using a potato masher add the salt, cumin, and cayenne and mash. Then, fold in the onions, tomatoes, cilantro, and garlic. Add 1 tablespoon of the reserved lime juice. Let sit at room temperature for 1 hour and then serve."
    ],
    "ingredientsLong": [
      "3 Haas avocados, halved, seeded and peeled",
      "1 lime, juiced",
      "1/2 teaspoon kosher salt",
      "1/2 teaspoon ground cumin",
      "1/2 teaspoon cayenne",
      "1/2 medium onion, diced",
      "1/2 jalapeno pepper, seeded and minced",
      "2 Roma tomatoes, seeded and diced",
      "1 tablespoon chopped cilantro",
      "1 clove garlic, minced"]
};

//Another example
var spaghetti = {
    "name": "Simple Spaghetti with Tomato Sauce",
    "ingredients": ["olive oil", "garlic", "salt", "red pepper flakes", "tomatoes", "basil", "spaghetti", "parmesan"],
    "time": "40",
    "courtesyOf": "Food Network Kitchen",
    "link": "https://www.foodnetwork.com/recipes/food-network-kitchen/simple-spaghetti-with-tomato-sauce-3362665",
    "photURL": "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2014/7/17/1/FN_Simple-Spaghetti-with-Tomato-Sauce_s4x3.jpg.rend.hgtvcom.616.462.suffix/1408069256188.jpeg",
    "directions": [
      "Cook the oil, garlic, 1/2 teaspoon salt and pepper flakes in a large skillet over medium heat, stirring, until the oil heats up and the garlic just starts to turn golden, 4 to 6 minutes.",
      "Add the tomatoes; rinse the can with about 1 cup of water, and add the water to the skillet. Add the basil, raise the heat to medium-high and simmer until the sauce thickens, 15 to 20 minutes.",
      "Bring a large pot of salted water to a boil.",
      "Meanwhile, add the spaghetti to the boiling water, and cook according to package directions; strain well.",
      "Add the cooked spaghetti to the sauce, and stir to coat. Serve with Parmesan if desired.",
    ],
    "ingredientsLong": [
      "3 tablespoons extra-virgin olive oil", "4 cloves garlic, very thinly sliced", "Kosher salt", "Pinch crushed red pepper flakes", "One 28-ounce can San Marzano plum tomatoes, crushed by hand",
      "1 cup torn basil leaves",
      "12 ounces spaghetti",
      "Grated Parmesan, optional"
    ]
};

//replace the contents of the array with your recipes
var myRecipes = [guacamole, spaghetti];

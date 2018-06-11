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

var friedRice = {
    "name":"pork fried rice",
    "ingredients": ["butter", "pork loin", "carrot", "broccoli", "green onion", "egg", "rice", "peas", "soy sauce", "garlic powder", "ginger"],
    "time": "30",
    "courtesyOf": "Olies",
    "link":"https://www.allrecipes.com/recipe/230818/pork-fried-rice/?internalSource=hub%20recipe&referringContentType=search%20results",
    "photURL": "https://images.media-allrecipes.com/userphotos/720x405/1353688.jpg",
    "directions": ["Melt butter in a large non-stick skillet over medium heat. Cook and stir pork, carrot, broccoli, peas, and green onion in melted butter until pork is cooked through, 7 to 10 minutes. Remove pork mixture to a bowl and return skillet to medium heat.",
                  "Scramble egg in the skillet until completely set. Return the pork mixture to the skillet. Stir rice, peas, soy sauce, garlic powder, and ground ginger into the pork mixture; cook and stir until heated through, 7 to 10 minutes."],
    "ingredientsLong": [
      "1 tablespoon butter",
      "1 (6 ounce) boneless pork loin chop, cut into small pieces",
      "1/4 cup chopped carrot",
      "1/4 cup chopped broccoli",
      "1 green onion, chopped",
      "1 egg, beaten",
      "1 cup cold cooked rice",
      "1/4 cup frozen peas",
      "1 1/2 tablespoons soy sauce",
      "1/8 teaspoon garlic powder",
      "1/8 teaspoon ground ginger"]
  };

  var mapleSalmon = {
      "name": "maple salmon",
      "ingredients": ["maple syrup", "soy sauce", "garlic", "garlic salt", "black pepper", "salmon"],
      "time":"60 min",
      "courtesyOf": "STARFLOWER",
      "link": "https://www.allrecipes.com/recipe/51283/maple-salmon/?internalSource=streams&referringId=17562&referringContentType=recipe%20hub&clickId=st_recipes_mades",
      "photURL":"https://images.media-allrecipes.com/userphotos/720x405/862371.jpg",
      "directions":["In a small bowl, mix the maple syrup, soy sauce, garlic, garlic salt, and pepper.",
                    "Place salmon in a shallow glass baking dish, and coat with the maple syrup mixture. Cover the dish, and marinate salmon in the refrigerator 30 minutes, turning once.",
                    "Preheat oven to 400 degrees F (200 degrees C).",
                    "Place the baking dish in the preheated oven, and bake salmon uncovered 20 minutes, or until easily flaked with a fork."],
      "ingredientsLong": [
                        "1/4 cup maple syrup",
                        "2 tablespoons soy sauce",
                        "1 clove garlic, minced",
                        "1/4 teaspoon garlic salt",
                        "1/8 teaspoon ground black pepper",
                        "1 pound salmon"]
  };

  var meatloaf = {
      "name": "meatloaf",
      "ingredients": ["ground beef", "egg", "onion", "milk", "bread crumbs", "salt", "pepper", "brown sugar", "mustard", "ketchup"],
      "time": "1 hour 10 min",
      "courtesyOf":"Janet Caldwell",
      "link":"https://www.allrecipes.com/recipe/16354/easy-meatloaf/?internalSource=pnm&referringId=17562&referringContentType=recipe%20hub",
      "photURL":"https://images.media-allrecipes.com/userphotos/720x405/682282.jpg",
      "directions":["Preheat oven to 350 degrees F (175 degrees C).",
                    "In a large bowl, combine the beef, egg, onion, milk, and bread OR cracker crumbs. Season with salt and pepper to taste and place in lightly greased 5x9 inch loaf pan, OR form into a loaf and place in a lightly greased 9x13 inch baking dish.",
                    "In a separate small bowl, combine the brown sugar, mustard, and ketchup. Mix well and pour over the meatloaf.",
                    "Bake at 350 degrees F (175 degrees C) for 1 hour."],
      "ingredientsLong": [
                          "1 1/2 pounds ground beef",
                          "1 egg",
                          "1 onion, chopped",
                          "1 cup milk",
                          "1 cup dried bread crumbs",
                          "salt and pepper to taste",
                          "2 tablespoons brown sugar",
                          "2 tablespoons prepared mustard",
                          "1/3 cup ketchup"]
  };

  var pulledPork = {
      "name": "Pulled Pork",
      "ingredients": ["pork tenderloin","root beer", "barbecue sauce", "hamburger buns"],
      "time": "7 hours 10 min",
      "courtesyOf": "Livie's Mommy",
      "link":"https://www.allrecipes.com/recipe/141678/slow-cooker-pulled-pork/?internalSource=hub%20recipe&referringId=17562&referringContentType=recipe%20hub",
      "photURL":"https://images.media-allrecipes.com/userphotos/720x405/586964.jpg",
      "directions":["Place the pork tenderloin in a slow cooker; pour the root beer over the meat. Cover and cook on low until well cooked and pork shreds easily, 6 to 7 hours. Note: the actual length of time may vary according to individual slow cooker. Drain well. Stir in barbecue sauce. Serve over hamburger buns."],
      "ingredientsLong":[
                          "1 (2 pound) pork tenderloin",
                          "1 (12 fluid ounce) can or bottle root beer",
                          "1 (18 ounce) bottle of your favorite barbecue sauce",
                          "8 hamburger buns, split and lightly toasted"]
  };

  var mushroomRisotto = {
      "name": "Gourmet Mushroom Risotto",
      "ingredients": ["chicken broth", "olive oil", "portobello mushrooms", "white mushrooms", "shallots", "arborio rice", "white wine", "sea salt", "black pepper", "chives", "butter", "parmesan cheese"],
      "time":"50 min",
      "courtesyOf": "Myleen Sagrado Sjödin",
      "link": "https://www.allrecipes.com/recipe/85389/gourmet-mushroom-risotto/?internalSource=hub%20recipe&referringId=17562&referringContentType=recipe%20hub",
      "photURL":"https://images.media-allrecipes.com/userphotos/720x405/246711.jpg",
      "directions":["In a saucepan, warm the broth over low heat.",
                    "Warm 2 tablespoons olive oil in a large saucepan over medium-high heat. Stir in the mushrooms, and cook until soft, about 3 minutes. Remove mushrooms and their liquid, and set aside.",
                    "Add 1 tablespoon olive oil to skillet, and stir in the shallots. Cook 1 minute. Add rice, stirring to coat with oil, about 2 minutes. When the rice has taken on a pale, golden color, pour in wine, stirring constantly until the wine is fully absorbed. Add 1/2 cup broth to the rice, and stir until the broth is absorbed. Continue adding broth 1/2 cup at a time, stirring continuously, until the liquid is absorbed and the rice is al dente, about 15 to 20 minutes.",
                    "Remove from heat, and stir in mushrooms with their liquid, butter, chives, and parmesan. Season with salt and pepper to taste."],
      "ingredientsLong":["6 cups chicken broth, divided",
                          "3 tablespoons olive oil, divided",
                          "1 pound portobello mushrooms, thinly sliced",
                          "1 pound white mushrooms, thinly sliced",
                          "2 shallots, diced",
                          "1 1/2 cups arborio rice",
                          "1/2 cup dry white wine",
                          "sea salt to taste",
                          "freshly ground black pepper to taste",
                          "3 tablespoons finely chopped chives",
                          "4 tablespoons butter",
                          "1/3 cup freshly grated parmesan cheese"]
  };


  var redCurryChicken = {
      "name": "Four-Ingredient Red Curry Chicken",
      "ingredients": ["coconut oil", "chicken", "cream of coconut", "Thai curry sauce", "rice stick vermicelli noodles"],
      "time": "29 min",
      "courtesyOf":"Culinary Envy",
      "link":"https://www.allrecipes.com/recipe/261479/four-ingredient-red-curry-chicken/",
      "photURL": "https://images.media-allrecipes.com/userphotos/720x405/3949345.jpg",
      "directions":["Heat oil in a large skillet on high heat. Add chicken cubes; cook until browned, about 2 minutes per side. Reduce heat to medium-high and add coconut cream and curry sauce. Cook until chicken is no longer pink in the center and the juices run clear, about 5 minutes. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C)",
                    "Fill a large pot with lightly salted water and bring to a rolling boil; stir in vermicelli pasta and return to a boil. Cook pasta uncovered, stirring occasionally, until the pasta is tender yet firm to the bite, 4 to 5 minutes. Drain.",
                    "Reduce skillet heat to simmer. Add the noodles and let simmer until flavors are absorbed, about 5 minutes. Divide chicken and noodles among individual serving bowls."],
      "ingredientsLong": [
                          "2 tablespoons coconut oil",
                          "1 (16 ounce) package skinless, boneless chicken breast halves, cut into small cubes",
                          "1 (14 ounce) can cream of coconut",
                          "1 (11 ounce) bottle red Thai curry sauce",
                          "1/2 (16 ounce) packaged dried rice stick vermicelli noodles"]
  };

  var macaroniAndCheese = {
      "name":"Simple Macaroni and Cheese",
      "ingredients":["elbow macaroni", "butter", "all-purpose flour", "salt", "black pepper", "milk", "cheddar cheese"],
      "time":"30 min",
      "courtesyOf":"g0dluvsugly",
      "link": "https://www.allrecipes.com/recipe/238691/simple-macaroni-and-cheese/?internalSource=pnm&referringId=1947&referringContentType=recipe%20hub",
      "photURL":"https://images.media-allrecipes.com/userphotos/560x315/5445825.jpg",
      "directions":["Bring a large pot of lightly salted water to a boil. Cook elbow macaroni in the boiling water, stirring occasionally until cooked through but firm to the bite, 8 minutes. Drain",
                    "Melt butter in a saucepan over medium heat; stir in flour, salt, and pepper until smooth, about 5 minutes. Slowly pour milk into butter-flour mixture while continuously stirring until mixture is smooth and bubbling, about 5 minutes. Add cheddar cheese to milk mixture and stir until cheese is melted, 2 to 4 minutes.",
                    "Fold macaroni into cheese sauce until coated."],
      "ingredientsLong":[
                          "1 (8 ounce) box elbow macaroni",
                          "1/4 cup butter",
                          "1/4 cup all-purpose flour",
                          "1/2 teaspoon salt",
                          "ground black pepper to taste",
                          "2 cups milk",
                          "2 cups shredded cheddar cheese"]
  };

  var spinachChicken = {
      "name":"Spinach Pesto Chicken Breasts",
      "ingredients":["spinach", "pesto", "chicken", "parmesan cheese"],
      "time":"55 min",
      "courtesyOf":"DRAGONNKITTEN",
      "link":"https://www.allrecipes.com/recipe/214492/spinach-pesto-chicken-breasts/",
      "photURL": "https://images.media-allrecipes.com/userphotos/720x405/4542213.jpg",
      "directions":["Preheat an oven to 375 degrees F (190 degrees C).",
                    "Mix the spinach and pesto together in a bowl; spread half the mixture into the bottom of a glass baking dish. Place the chicekn breasts onto the spinach mixture; top with the rest of the mixture. Cover the dish with aluminum foil.",
                    "Bake in the preheated oven until the chicken is no longer pink in the center and the juices run clear, about 30 minutes. Uncover and sprinkle the Parmesan cheese. Return to the oven and bake until the cheese has begun to melt and brown, about 15 minutes."],
      "ingredientsLong":[
                          "1 1/2 cups finely chopped fresh spinach",
                          "2 tablespoons basil pesto, or to taste",
                          "4 skinless, boneless chicken breast halves",
                          "2 tablespoons grated Parmesan cheese (optional)"]
  };

  var goatCheesePizza = {
      "name": "Goat Cheese Arugula Pizza",
      "ingredients": ["pizza crust", "pesto", "roma tomatoes", "goat cheese", "garlic", "arugula", "olive oil"],
      "time":"20 min",
      "courtesyOf":"collmarie",
      "link":"https://www.allrecipes.com/recipe/129557/goat-cheese-arugula-pizza-no-red-sauce/",
      "photURL":"https://images.media-allrecipes.com/userphotos/720x405/2131632.jpg",
      "directions":["Preheat oven according to pizza package instructions.",
                    "Dab pesto onto the center of the pizza base, and spread toward the outer edges. Cut the goat chees into thin coins, and spread or crumble across the pizza. Arrange tomato slices over goat cheese. Sprinkle with garlic. Brush the crust edge lightly with olive oil.",
                    "Place pizza directly on preheated oven rack. Bake for 5 to 10 minutes, or until the crust edges are golden.",
                    "After taking pizza out of the oven, allow to cool for a few minutes so that the cheese has time to set. After a couple of minutes, cover the pizza with few handfuls of argula. Cut, server, and enjoy!"],
      "ingredientsLong":[
                          "1 unbaked pizza crust",
                          "6 tablespoons prepared pesto sauce",
                          "3 roma tomatoes, thinly sliced",
                          "1 (8 ounce) package seasoned goat cheese",
                          "2 cloves garlic, peeled and thinly sliced",
                          "1 cuup fresh argula",
                          "1 teaspoon olive oil"]
  };

  var pestoPastaSalad = {
      "name":"Pesto Pasta Caprese Salad",
      "ingredients": ["rotini pasta", "pesto", "olive oil","salt", "granulated garlic", "black pepper", "grape tomatoes", "fresh mozzarella balls", "basil"],
      "time":"20 min",
      "courtesyOf":"thedailygourmet",
      "link":"https://www.allrecipes.com/recipe/232211/pesto-pasta-caprese-salad/",
      "photURL":"https://images.media-allrecipes.com/userphotos/560x315/1061881.jpg",
      "directions":["Bring a large pot of lightly salted water to a boil; cook the rotini at a boil until tender yet firm to the bite, about 8 minutes; drain.",
                    "Mix pesto, olive oil, salt, granulated garlic, and black pepper in a bowl; add rotini. Toss to coat. Fold in tomatoes mozzarella, and fresh basil."],
      "ingredientsLong":[
                          "1 1/2 cups rotini pasta,",
                          "3 tablespoons pesto, or to taste",
                          "1 tablespoon extra-virgin olive oil",
                          "1/4 teaspoon salt, or to taste",
                          "1/4 teaspoon granulated garlic",
                          "1/8 teaspoon ground black pepper",
                          "1/2 cup halved grape tomatoes",
                          "1/2 cup small (pearlini) fresh mozzarella balls",
                          "2 leaves fresh basil leaves, finely shreaded"]
  };



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
var myRecipes = [friedRice, mapleSalmon, meatloaf, pulledPork, mushroomRisotto, redCurryChicken, macaroniAndCheese, spinachChicken, goatCheesePizza, pestoPastaSalad];

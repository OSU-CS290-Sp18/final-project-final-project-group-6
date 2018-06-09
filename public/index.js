
var searchInput = document.getElementsByClassName("search-input")[0];
var genButton = document.getElementById("generate-recipes-button");
var ingredientNames = document.getElementsByClassName("ingredient-name");

//sends user search query to database, adds to ingredients-container if successful
function searchAddIngredient(){
  var query = searchInput.value;
  var query_URL = "/search/" + query;

  console.log(query_URL);

  //this is actually probably dangerous, but it works for now
  //I'm sure someone could mess with the DB by sending the right commands to it
  var request = new XMLHttpRequest();
  request.open('GET', query_URL);
  request.send();

  request.onload = function (){
    console.log(request.status);
    if(request.status === 200) addIngredient(query); //add ingredient to container if successful search
  };
}

//adds ingredient to next slot in the ingredients-container
function addIngredient(name){
  var ingredientTemplate = Handlebars.templates.ingredient;

  var ingredientHTML = ingredientTemplate ({
    ingredientName: name
  });

  var ingredientsContainer = document.querySelector('#ingredients-container');
  ingredientsContainer.insertAdjacentHTML('beforeend', ingredientHTML);
}

//listens for enter key press on search
searchInput.addEventListener('keyup', function(event){
  event.preventDefault(); //do nothing unless enter was pressed
  if(event.keyCode === 13){ //13 is the enter key
    searchAddIngredient();
    searchInput.value = "";

    //TODO: alert user if invalid ingredient (maybe make the search bar fade red for half a second?)
  }
});

function generateRecipes(){
  console.log("Num ingredients: ", ingredientNames.length);

  var ingredientNamesString = "recipesWith/";
  for (var i = 0; i < ingredientNames.length - 1; i++){
    ingredientNamesString += ingredientNames[i].textContent + ",";
  }

  ingredientNamesString += ingredientNames[ingredientNames.length - 1].textContent;

  console.log(ingredientNamesString);

  var request = new XMLHttpRequest();
  request.open('GET', ingredientNamesString);
  request.send();

  request.onload = function (){
    console.log(request.status);
    if(request.status === 200){
      var generatedRecipeNames = request.response;

      var requestRecipes = new XMLHttpRequest();
      requestRecipes.open('GET', "/genRecipe/" + generatedRecipeNames);
      requestRecipes.send();
    }
  };



}

genButton.addEventListener('click', generateRecipes);

//TODO: clicks on ingredient-remove-button should remove button from DOM

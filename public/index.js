
var searchInput = document.getElementsByClassName("search-input")[0];
var genButton = document.getElementById("generate-recipes-button");
var ingredientNames = document.getElementsByClassName("ingredient-name");

function setFocus()
{
	console.log("focused");
	document.getElementById("navbar-search-input").focus();
}


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
  
  //adds delete listener to X 
  var xbutton = ingredientsContainer.getElementsByClassName("remove-ingredient-button");
  var xl = xbutton.length;
  xbutton[xl - 1].addEventListener('click', function(){removeIngredient(name);});
  
}

//finds and removes ingredient tag
function removeIngredient(name)
{
	var tags = document.getElementsByClassName("mainpage-ingredient");
	var l = tags.length;
	var i;
	for (i = 0; i < l; i++)
	{
		var iname = tags[i].getElementsByClassName("ingredient-name")[0].innerHTML;

		if (iname === name)
		{
			var rItem = document.getElementsByClassName("mainpage-ingredient")[i];
			document.getElementById("ingredients-container").removeChild(rItem);
		}
	}
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

//Sends all of the user-entered ingredients to the server
//Generates an array of the recipes on the server side
//This array will be used to dynamically generate the recipes page
function generateRecipes(){
  console.log("Num ingredients: ", ingredientNames.length);

  //used in a GET request to send ingredient names to server
  var ingredientNamesString = "recipesWith/";
  for (var i = 0; i < ingredientNames.length - 1; i++){
    ingredientNamesString += ingredientNames[i].textContent + ",";
  }

  //This is done to avoid the extra comma at the end
  ingredientNamesString += ingredientNames[ingredientNames.length - 1].textContent;

  console.log(ingredientNamesString);

  //first send the ingredient names to the server
  var request = new XMLHttpRequest();
  request.open('GET', ingredientNamesString);
  request.send();

  request.onload = function (){
    console.log(request.status);
    if(request.status === 200){
      window.location.href = "/genRecipe";
    }
  };
}

genButton.addEventListener('click', generateRecipes);

//TODO: clicks on ingredient-remove-button should remove button from DOM

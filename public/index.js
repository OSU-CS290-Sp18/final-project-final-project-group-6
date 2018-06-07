
var searchInput = document.getElementsByClassName("search-input")[0];

//sends user search query to database, adds to ingredients-container if successful
function searchAddIngredient(){
  var query = searchInput.value;
  var query_URL = "/search/" + query;

  console.log(query_URL);

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
  }
});

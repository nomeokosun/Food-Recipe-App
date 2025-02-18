// let APIKEY = `2a2459ab96a24bcf92d2ddb400835fd9`
// let mainContainer = document.getElementById("main-container")
// let form = document.getElementById("form")
// let button = document.getElementById("button")
// let inputField = document.getElementById("input-field")


// // collect data from input field


// form.addEventListener("submit" , collectData)
//     function collectData(event){
//         event.preventDefault()
//         let inputData = inputField.value
//         // console.log(inputData)

// collectRecipe(inputData)
// }


// // fetch data from API

// function collectRecipe(inputData){
//     // let recipeRequest = new XMLHttpRequest()
//     // recipeRequest.open(GET , "https://api.spoonacular.com/recipes/complexSearch")

//     // This returns basic recipe information like ids, titles and images

//     let endpoint = `https://api.spoonacular.com/recipes/complexSearch?q=${inputData}&apiKey=${APIKEY}`

//     fetch(endpoint).then((data)=>{
//         return data.json()
//     }).then((recipeData)=>{
//         // console.log(recipeData.results)
//         recipeData.results.forEach(recipe => {
//             // console.log(recipe.id) // Logs each recipe's ID
//         })

//         // Here we are using another endpoint to get the recipe ingredients, instructions etc, using the recipe id

//         let recipeId = recipeData.results[0].id

//     let recipeDetailsendpoint = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${APIKEY}`

//     fetch(recipeDetailsendpoint).then((newData)=>{
//         return newData.json()
//     }).then((newRecipeData)=>{
//         // console.log(newRecipeData)

//     })
//     })

    
//     }




// // print recipe on the UI

// // const printRecipe = ()=>{

// //     let instructions = analyzedInstructions[0].steps
// //     let cookingTime = preparationMinutes
// //     console.log(cookingTime)
  
// // }
// if (analyzedInstructions.length > 0) {
//     let instructions = analyzedInstructions[0].steps; // Access the first set of steps
//     console.log("Instructions:", instructions);
// } else {
//     console.log("No instructions found!");
// }




let APIKEY = `2a2459ab96a24bcf92d2ddb400835fd9`;
let mainContainer = document.getElementById("main-container");
let form = document.getElementById("form");
let button = document.getElementById("button");
let inputField = document.getElementById("input-field");
let heroImage = document.querySelector(".img-container"); // Target the image div

// Collect data from input field
form.addEventListener("submit", collectData);

function collectData(event) {
    event.preventDefault();
    let inputData = inputField.value;
    collectRecipe(inputData);
}

// Fetch data from API
function collectRecipe(inputData) {
    let endpoint = `https://api.spoonacular.com/recipes/complexSearch?query=${inputData}&apiKey=${APIKEY}`;

    fetch(endpoint)
        .then((data) => data.json())
        .then((recipeData) => {
            if (recipeData.results.length === 0) {
                console.log("No recipes found!");
                return;
            }

            let recipeId = recipeData.results[0].id;

            let recipeDetailsEndpoint = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${APIKEY}`;

            fetch(recipeDetailsEndpoint)
                .then((newData) => newData.json())
                .then((newRecipeData) => {
                    displayRecipe(newRecipeData);
                });
        })
        .catch((error) => console.error("Error fetching recipe:", error));
}

// Display recipe on the UI
function displayRecipe(recipe) {
    let recipeContainer = document.getElementById("recipe-container");

    // Update hero section with recipe image
    heroImage.innerHTML = `<img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">`;

    // Populate recipe details
    recipeContainer.innerHTML = `
        <div class="recipe-title-and-description">
            <h5>${recipe.title}</h5>
            <p>${recipe.summary.replace(/<[^>]*>?/gm, '')}</p>
        </div>

        <div class="ingredients-title-and-ul">
            <h6>Ingredients</h6>
            <ul>
                ${recipe.extendedIngredients
                    .map((ingredient) => `<li>${ingredient.original}</li>`)
                    .join("")}
            </ul>
        </div>

        <div class="instructions-container">
            <h6>Instructions</h6>
            <ol>
                ${recipe.analyzedInstructions.length
                    ? recipe.analyzedInstructions[0].steps
                          .map((step) => `<li>${step.step}</li>`)
                          .join("")
                    : "<li>No instructions available</li>"}
            </ol>
        </div>

        <div class="cooking-time-container">
            <h6>Cooking Time</h6>
            <p>${recipe.readyInMinutes} Minutes</p>
        </div>

        <div class="serving-size-container">
            <h6>Serving Size</h6>
            <p>${recipe.servings} servings</p>
        </div>
    `;
}


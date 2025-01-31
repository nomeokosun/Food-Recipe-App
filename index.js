let APIKEY = `2a2459ab96a24bcf92d2ddb400835fd9`
let mainContainer = document.getElementById("main-container")
let form = document.getElementById("form")
let button = document.getElementById("button")
let inputField = document.getElementById("input-field")


// collect data from input field


form.addEventListener("submit" , collectData)
    function collectData(event){
        event.preventDefault()
        let inputData = inputField.value
        // console.log(inputData)

collectRecipe(inputData)
}


// fetch data from API

function collectRecipe(inputData){
    // let recipeRequest = new XMLHttpRequest()
    // recipeRequest.open(GET , "https://api.spoonacular.com/recipes/complexSearch")

    // This returns basic recipe information like ids, titles and images

    let endpoint = `https://api.spoonacular.com/recipes/complexSearch?q=${inputData}&apiKey=${APIKEY}`

    fetch(endpoint).then((data)=>{
        return data.json()
    }).then((recipeData)=>{
        // console.log(recipeData.results)
        recipeData.results.forEach(recipe => {
            // console.log(recipe.id) // Logs each recipe's ID
        })

        // Here we are using another endpoint to get the recipe ingredients, instructions etc, using the recipe id

        let recipeId = recipeData.results[0].id

    let recipeDetailsendpoint = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${APIKEY}`

    fetch(recipeDetailsendpoint).then((newData)=>{
        return newData.json()
    }).then((newRecipeData)=>{
        // console.log(newRecipeData)

    })
    })

    
    }




// print recipe on the UI

// const printRecipe = ()=>{

//     let instructions = analyzedInstructions[0].steps
//     let cookingTime = preparationMinutes
//     console.log(cookingTime)
  
// }
if (analyzedInstructions.length > 0) {
    let instructions = analyzedInstructions[0].steps; // Access the first set of steps
    console.log("Instructions:", instructions);
} else {
    console.log("No instructions found!");
}



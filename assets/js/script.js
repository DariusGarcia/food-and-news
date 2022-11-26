var tastyURL = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes`

// edamam api
// new API endpoint because the old API hit the monthly 500 limit
var appID = '8909c56f'
var appAPIKey = '77ee9383a58d5bfa72e049c92b170546'

// query select elements
var recipeContainerEl = document.querySelector('#recipeContainer')
var buttonEl = document.querySelector('#searchBtn')
var recipeSearchBtn = document.querySelector('#recipe-search-btn')
var recipeContentCardEl = document.querySelector('#recipe-content-card')
var recipeDescriptionContainerEl = document.querySelector(
	'#recipe-description-container'
)
var recipeDetailsContainerEl = document.querySelector(
	'#recipe-details-container'
)

var edamamDataStore = []
// fetch Edamam API endpoint to get recipe details (10,000 calls/ month limit)s
function fetchEdamam(event) {
	event.preventDefault()
	// reset the data array to be empty
	edamamDataStore.length = 0
	var userRecipeSearchInputEl = document.querySelector(
		'#recipe-search-input'
	).value
	var edamamURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${userRecipeSearchInputEl}&app_id=${appID}&app_key=${appAPIKey}`
	fetch(edamamURL)
		.then((response) => response.json())
		.then((data) => {
			const dataReceived = data.hits
			console.log(`call data: ${JSON.stringify(dataReceived)}`)
			edamamDataStore.push(JSON.stringify(dataReceived))
			console.log(`Populated array: ${JSON.stringify(edamamDataStore[0][1])}`)
			handleRecipeResults(dataReceived)
			return data.hits
		})
	userRecipeSearchInputEl.textContent = ''
}

function handleRecipeResults(arr) {
	for (var i = 0; i < arr.length; i++) {
		var cardContainer = document.createElement('article')
		cardContainer.setAttribute(
			'class',
			' flex flex-col gap-2 w-full bg-white p-2 rounded-md my-2 hover:bg-blue-200'
		)
		var recipeLabelEl = document.createElement('h3')
		recipeLabelEl.setAttribute(
			'class',
			'flex flex-col  p-2  rounded-md cursor-pointer '
		)
		recipeLabelEl.textContent = arr[i].recipe.label
		var recipeCaloriesEl = document.createElement('p')
		recipeCaloriesEl.setAttribute(
			'class',
			'flex flex-col  p-2  rounded-md cursor-pointer '
		)
		recipeCaloriesEl.textContent = `Calories: ${arr[i].recipe.calories.toFixed(
			2
		)}`
		var recipeImageEl = document.createElement('img')
		recipeImageEl.setAttribute('src', arr[i].recipe.image)
		recipeImageEl.setAttribute('id', 'recipe-image')
		cardContainer.appendChild(recipeLabelEl)
		cardContainer.appendChild(recipeCaloriesEl)
		cardContainer.appendChild(recipeImageEl)
		// recipeItem.addEventListener('click', displayRecipeData(arr, i))
		recipeContentCardEl.appendChild(cardContainer)
		console.log(`description: ${edamamDataStore[0][1].label}`)
	}
	return recipeContentCardEl
}

function displayRecipeData(arr, i) {
	var selectedRecipe = arr[i].recipe.label
	var detailsURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${selectedRecipe}&app_id=${appID}&app_key=${appAPIKey}`
	fetch(detailsURL)
		.then((response) => response.json())
		.then((data) => {
			var dataReceived = data.hits
			return dataReceived
		})

	for (var i = 0; i < dataReceived.length; i++) {
		var recipeDescriptionItem = document.createElement('p')
		recipeDescriptionItem.textContent = dataReceived[i].recipe.label
		recipeDescriptionContainerEl.appendChild(recipeDescriptionItem)
	}
	return recipeDescriptionContainerEl
}

recipeSearchBtn.addEventListener('click', fetchEdamam)

// header parameters for Tasty API
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '74e6ae4b12mshf87161aa2327b81p1e302ajsnfd1c233f30e7',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
	},
}

// recipe.dietLabels
// recipe.calories
// recipe.cuisineType
// recipe.healthLabels
// recipe.images["REGULAR"]
// recipe.images["THUMBNAIL"]
// recipe.ingredientLines
// recipe.totalTime

// object properties that we are using to display as data (Tasty API)
// arr[i].name
// arr[i].description
// arr[i].num_servings
// arr[i].thumbnail_url
// arr[i].prep_time_minutes

// old fetch function for tastyURL
// reached the max API calls for the month for this api endpoint (switched to Edamam Recipe API)

// function fetchRecipe() {
// 	fetch(tastyURL, options)
// 		.then((response) => response.json())
// 		.then((response) => {
// 			console.log(response.results)
// 			return response.results
// 		})
// 		.then((data) => handleResults(data))
// 		.catch((err) => console.error(err))
// }

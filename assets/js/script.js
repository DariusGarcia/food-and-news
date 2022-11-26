var tastyURL = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes`

// json data for dev fetch calls instead of using up the limited API calls from Tasty API.
var tastyDev = './data.json'

// edamam api
var appID = '8909c56f'
var appAPIKey = '77ee9383a58d5bfa72e049c92b170546'

// query select elements
var recipeContainerEl = document.querySelector('#recipeContainer')
var buttonEl = document.querySelector('#searchBtn')
var recipeSearchBtn = document.querySelector('#recipe-search-btn')
var recipeContentCardEl = document.querySelector('#recipe-content-card')
var recipeDetailsContainerEl = document.querySelector(
	'#recipe-details-container'
)

// fetch Edamam API endpoint to get recipe details (10,000 calls/ month limit)s
function fetchEdamam(event) {
	event.preventDefault()
	recipeContentCardEl.innerHTML = ''
	var userRecipeSearchInputEl = document.querySelector(
		'#recipe-search-input'
	).value
	var edamamURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${userRecipeSearchInputEl}&app_id=${appID}&app_key=${appAPIKey}`
	fetch(edamamURL)
		.then((response) => response.json())
		.then((data) => {
			const dataReceived = data.hits
			handleRecipeResults(dataReceived)
			return data.hits
		})
}

function handleRecipeResults(arr) {
	for (var i = 0; i < arr.length; i++) {
		var recipeItem = document.createElement('h3')
		recipeItem.textContent = arr[i].recipe.label
		recipeContentCardEl.appendChild(recipeItem)
	}
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

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
			console.log(data.hits)
			edamamDataStore.push(JSON.stringify(dataReceived))
			console.log(`Populated array: ${JSON.stringify(edamamDataStore[0][1])}`)
			handleRecipeResults(dataReceived)
			return data.hits
		})
	userRecipeSearchInputEl.textContent = ''
}

function handleRecipeResults(arr) {
	for (var i = 0; i < arr.length; i++) {
		var cardContainerLeft = document.createElement('article')
		var cardContainerRight = document.createElement('article')
		var cardWrapper = document.createElement('div')
		var cardWrapperRight = document.createElement('div')
		var instructionsEl = document.createElement('article')
		instructionsEl.setAttribute('id', 'instructions')
		var ingredientListEl = document.createElement('ol')

		// ingredients list
		const ingredientsObj = arr[i].recipe.ingredientLines
		ingredientsObj.map((item) => {
			var ingredientItem = document.createElement('li')
			ingredientItem.textContent = item
			ingredientListEl.appendChild(ingredientItem)
		})
		instructionsEl.textContent = arr[i].recipe
		cardWrapper.setAttribute('id', 'recipeCardWrapper')
		cardContainerLeft.setAttribute('id', 'recipeCardContainerLeft')
		cardContainerRight.setAttribute('id', 'recipeCardContainerRight')
		var recipeLabelEl = document.createElement('h3')
		recipeLabelEl.setAttribute('id', 'recipeLabel')

		recipeLabelEl.textContent = arr[i].recipe.label
		var recipeCaloriesEl = document.createElement('p')
		recipeCaloriesEl.setAttribute('id', 'recipeCaloriesEl')
		recipeCaloriesEl.textContent = `${arr[i].recipe.calories.toFixed(0)}cal`
		var recipeImageEl = document.createElement('img')
		recipeImageEl.setAttribute('src', arr[i].recipe.image)
		recipeImageEl.setAttribute('id', 'recipe-image')

		var recipeCuisineType = document.createElement('p')
		recipeCuisineType.setAttribute('id', 'cuisineType')
		recipeCuisineType.textContent = arr[i].recipe.cuisineType
		cardContainerRight.appendChild(recipeCaloriesEl)
		cardContainerRight.appendChild(ingredientListEl)
		cardContainerLeft.appendChild(recipeLabelEl)
		cardContainerLeft.appendChild(recipeCuisineType)
		cardContainerLeft.appendChild(recipeImageEl)
		cardWrapper.appendChild(cardContainerLeft)
		cardWrapper.appendChild(cardContainerRight)
		recipeContentCardEl.setAttribute('id', 'recipeContentCardEl')
		recipeContentCardEl.appendChild(cardWrapper)
		recipeContentCardEl.appendChild(cardWrapperRight)
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
// recipe.image
// recipe.ingredientLines
// recipe.totalTime

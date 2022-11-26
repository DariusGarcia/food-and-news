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
	var userRecipeSearchInputEl = document.querySelector('#recipe-search-input')
	userRecipeSearchInputEl = userRecipeSearchInputEl.value
	var edamamURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${userRecipeSearchInputEl}&app_id=${appID}&app_key=${appAPIKey}`
	fetch(edamamURL)
		.then((response) => response.json())
		.then((data) => {
			const dataReceived = data.hits
			edamamDataStore.push(JSON.stringify(dataReceived))
			handleRecipeResults(dataReceived)
		})
	userRecipeSearchInputEl.value = ''
	userRecipeSearchInputEl.textContent = ''
}

function handleRecipeResults(arr) {
	recipeContentCardEl.innerHTML = ''
	for (var i = 0; i < arr.length; i++) {
		var cardContainerLeft = document.createElement('article')
		var cardContainerRight = document.createElement('article')
		var cardWrapper = document.createElement('div')
		var cardWrapperRight = document.createElement('div')

		// instructions and ingredients elements
		var instructionsEl = document.createElement('article')
		instructionsEl.setAttribute('id', 'instructions')

		// ingredients list
		var ingredientListEl = document.createElement('ol')
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

		// name of recipe
		var recipeLabelEl = document.createElement('h3')
		recipeLabelEl.setAttribute('id', 'recipeLabel')
		recipeLabelEl.textContent = arr[i].recipe.label

		// recipe image element
		var recipeImageEl = document.createElement('img')
		recipeImageEl.setAttribute('src', arr[i].recipe.image)
		recipeImageEl.setAttribute('alt', `${arr[i].recipe.label}`)
		recipeImageEl.setAttribute('id', 'recipe-image')

		// recipe diet labels tags
		var dietTagsContainer = document.createElement('ul')
		dietTagsContainer.setAttribute('id', 'dietTagsContainer')
		var dietTagindex = arr[i].recipe.dietLabels
		dietTagindex.map((item) => {
			var dietTagItem = document.createElement('li')
			dietTagItem.setAttribute('id', 'diet-tag-item')
			dietTagItem.textContent = item
			dietTagsContainer.appendChild(dietTagItem)
		})

		// recipe calories element
		var recipeCaloriesEl = document.createElement('p')
		recipeCaloriesEl.setAttribute('id', 'recipeCaloriesEl')
		recipeCaloriesEl.textContent = `${arr[i].recipe.calories.toFixed(0)}cal`

		// recipe instructions element
		var instructionsEl = document.createElement('a')
		instructionsEl.setAttribute('id', 'instructionsURL')
		instructionsEl.setAttribute('href', arr[i].recipe.url)
		instructionsEl.setAttribute('target', '__blank')
		// instructionsEl.addEventListener(
		// 	'click',
		// 	(window.location.assign = arr[i].recipe.url)
		// )

		//recipe cuisine type (e.g. mexican/american)
		var recipeCuisineType = document.createElement('p')
		recipeCuisineType.setAttribute('id', 'cuisineType')
		recipeCuisineType.textContent = arr[i].recipe.cuisineType

		// append child el to containers
		cardContainerRight.appendChild(dietTagsContainer)
		cardContainerRight.appendChild(instructionsEl)
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

recipeSearchBtn.addEventListener('click', fetchEdamam)

// header parameters for Tasty API
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '74e6ae4b12mshf87161aa2327b81p1e302ajsnfd1c233f30e7',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
	},
}

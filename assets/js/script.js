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

// array to store the fetched recipe data information
var edamamDataStore = []

// fetch Edamam API endpoint to get recipe details (10,000 calls/ month limit)
function fetchEdamam(event) {
	event.preventDefault()
	// reset the data array to be empty on every fetch request
	edamamDataStore.length = 0
	var userRecipeSearchInput = document.querySelector(
		'#recipe-search-input'
	).value
	// daniel did this
	localStorage.setItem(
		'receipesSearched',
		JSON.stringify(userRecipeSearchInput)
	)

	var edamamURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${userRecipeSearchInput}&app_id=${appID}&app_key=${appAPIKey}`
	fetch(edamamURL)
		.then((response) => response.json())
		.then((data) => {
			const dataReceived = data.hits
			// push the JSON data into the edamam data store array
			edamamDataStore.push(JSON.stringify(dataReceived))
			// console.log('store:' + edamamDataStore)
			// pass the response JSON data into the handler function to populate the recipe card with the details
			displayRecipeDetails(dataReceived)

			// sets the searched recipe results to local storage
			localStorage.setItem('searched-recipes', JSON.stringify(data.hits))
			var localStorageData = JSON.parse(
				localStorage.getItem('searched-recipes')
			)
			// console.log(`local storage data: ${localStorageData}`)
		})

	// reset the input fields and recipe list to empty after fetching searched recipe.
	userRecipeSearchInput.value = ''
	userRecipeSearchInput.textContent = ''
	historyAppend()
}

// data handler function to populate the recipe section list with each recipe details.
function displayRecipeDetails(arr) {
	recipeContentCardEl.innerHTML = ''
	// looping through the data object and creating an <article> element for each individual recipe.
	for (var i = 0; i < arr.length; i++) {
		// cardContainerLeft holds recipe label, cuisineType, image, and nutritionalFactsContainer
		// cardContainerRight holds recipe diet label tags, dish type, cals, servings, instructions and ingredients.
		var cardContainerLeft = document.createElement('article')
		var cardContainerRight = document.createElement('article')
		// containerEnd holds the ingredients on large viewports widths.
		var cardContainerEnd = document.createElement('article')
		// card wrapper holds all three cardContainers so that a grid layout can be applied on large viewports and flex layout on mobile viewports.
		var cardWrapper = document.createElement('div')
		var cardWrapperRight = document.createElement('div')

		// instructions and ingredients elements
		var instructionsEl = document.createElement('article')
		instructionsEl.setAttribute('id', 'instructions')

		// ingredients list
		var ingredientListEl = document.createElement('ol')
		ingredientListEl.setAttribute('id', 'ingredientsContainer')
		const ingredientsObj = arr[i].recipe.ingredientLines
		// looping through the array of ingredient strings and putting them in their own <li> tag.
		ingredientsObj.map((item) => {
			var ingredientItem = document.createElement('li')
			ingredientItem.setAttribute('id', 'ingredientItem')
			ingredientItem.textContent = item
			ingredientListEl.appendChild(ingredientItem)
		})
		instructionsEl.textContent = arr[i].recipe
		cardWrapper.setAttribute('id', 'recipeCardWrapper')
		cardContainerLeft.setAttribute('id', 'recipeCardContainerLeft')
		cardContainerRight.setAttribute('id', 'recipeCardContainerRight')
		cardContainerEnd.setAttribute('id', 'recipeCardContainerEnd')

		// recipe name label element
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
		// looping through the diet labels array and creating a new <li> tag for each diet label.
		dietTagindex.map((item) => {
			var dietTagItem = document.createElement('li')
			dietTagItem.setAttribute('id', 'diet-tag-item')
			dietTagItem.textContent = item
			dietTagsContainer.appendChild(dietTagItem)
		})

		// recipe instructions element
		var instructionsEl = document.createElement('a')
		instructionsEl.setAttribute('id', 'instructionsURL')
		instructionsEl.setAttribute('href', arr[i].recipe.url)
		instructionsEl.setAttribute('target', '__blank')

		// recipe calories element
		var recipeCaloriesEl = document.createElement('p')
		recipeCaloriesEl.setAttribute('id', 'recipeCaloriesEl')
		recipeCaloriesEl.textContent = `${arr[i].recipe.calories.toFixed(0)}cal`

		// recipe dish type
		var dishTypeEl = document.createElement('p')
		dishTypeEl.setAttribute('id', 'dishType')
		dishTypeEl.textContent = arr[i].recipe.dishType[0]

		// recipe servings
		var servingsAmountEl = document.createElement('p')
		servingsAmountEl.setAttribute('id', 'servingsAmount')
		servingsAmountEl.textContent = `${arr[i].recipe.yield}`

		// nutritional facts element
		var nutritionalFactsContainer = document.createElement('ul')
		nutritionalFactsContainer.setAttribute('id', 'nutritionalFactsContainer')
		var fatAmount = document.createElement('li')
		fatAmount.textContent = `${arr[i].recipe.digest[0].label}: ${arr[
			i
		].recipe.digest[0].total.toFixed(0)}${arr[i].recipe.digest[0].unit}`
		var carbsAmount = document.createElement('li')
		carbsAmount.textContent = `${arr[i].recipe.digest[1].label}: ${arr[
			i
		].recipe.digest[1].total.toFixed(0)}${arr[i].recipe.digest[1].unit}`
		var proteinAmount = document.createElement('li')
		proteinAmount.textContent = `${arr[i].recipe.digest[2].label}: ${arr[
			i
		].recipe.digest[2].total.toFixed(0)}${arr[i].recipe.digest[2].unit}`
		var sodiumAmount = document.createElement('li')
		sodiumAmount.textContent = `${arr[i].recipe.digest[4].label}: ${arr[
			i
		].recipe.digest[4].total.toFixed(0)}${arr[i].recipe.digest[4].unit}`
		nutritionalFactsContainer.appendChild(fatAmount)
		nutritionalFactsContainer.appendChild(carbsAmount)
		nutritionalFactsContainer.appendChild(proteinAmount)
		nutritionalFactsContainer.appendChild(sodiumAmount)

		//recipe cuisine type (e.g. mexican/american)
		var recipeCuisineType = document.createElement('p')
		recipeCuisineType.setAttribute('id', 'cuisineType')
		recipeCuisineType.textContent = arr[i].recipe.cuisineType

		cardContainerRight.appendChild(ingredientListEl)
		cardContainerLeft.appendChild(recipeLabelEl)
		cardContainerLeft.appendChild(recipeCuisineType)
		cardContainerLeft.appendChild(recipeImageEl)
		cardContainerLeft.appendChild(nutritionalFactsContainer)
		cardContainerLeft.appendChild(dietTagsContainer)
		cardContainerLeft.appendChild(instructionsEl)
		cardContainerLeft.appendChild(dishTypeEl)
		cardContainerLeft.appendChild(recipeCaloriesEl)
		cardContainerLeft.appendChild(servingsAmountEl)
		cardWrapper.appendChild(cardContainerLeft)
		cardWrapper.appendChild(cardContainerRight)
		recipeContentCardEl.appendChild(cardWrapper)
		recipeContentCardEl.appendChild(cardWrapperRight)
		recipeContentCardEl.setAttribute('id', 'recipeContentCardEl')
	}
	return recipeContentCardEl
}

var historyList = document.querySelector('#history-container')
var searchHistoryArr = []

var historyList = document.querySelector('#history-container')

function historyApend() {
	var userRecipeSearchInput = document.querySelector(
		'#recipe-search-input'
	).value
	if (!userRecipeSearchInput) {
		document.querySelector('#').textContent =
			'Recipe NOT FOUND, PLEASE TRY AGAIN'
		return
	}

	if (searchHistoryArr.length > 3) {
		searchHistoryArr = 3
	}
	searchHistoryArr.push(userRecipeSearchInput)
	var historyBtn = document.createElement('button')
	historyBtn.textContent = userRecipeSearchInput
	historyBtn.setAttribute('value', userRecipeSearchInput)
	historyBtn.setAttribute(
		'class',
		'p-2 bg-blue-200 flex items-center rounded-md'
	)
	historyBtn.setAttribute('id', 'history-btn')

	historyBtn.addEventListener('click', () => {
		userRecipeSearchInput = historyBtn.textContent
		fetchEdamam()
	})
	historyList.appendChild(historyBtn)
}

// fetch recipe searched query when user clicks 'search for recipe button'
recipeSearchBtn.addEventListener('click', fetchEdamam)

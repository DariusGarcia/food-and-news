var tastyURL = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes`
// json data for dev fetch calls instead of using up the limited API calls from Tasty API.
var tastyDev = './data.json'

// query select elements
var recipeContainerEl = document.querySelector('#recipeContainer')
var recipeDropdown = document.querySelector('#recipeDropdown')
var buttonEl = document.querySelector('#searchBtn')
var recipeDetailsContainerEl = document.querySelector(
	'#recipe-details-container'
)

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '74e6ae4b12mshf87161aa2327b81p1e302ajsnfd1c233f30e7',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
	},
}

// fetch Tasty API to get recipe details
function fetchRecipe() {
	fetch(tastyURL, options)
		.then((response) => response.json())
		.then((response) => {
			console.log(response.results)
			return response.results
		})
		.then((data) => handleResults(data))
		.catch((err) => console.error(err))
}

// function that populates the dropdown menu with recipe results
function handleResults(arr) {
	for (var i = 0; i < arr.length; i++) {
		var dropdownItem = document.createElement('option')
		dropdownItem.textContent = arr[i].name
		dropdownItem.addEventListener('change', handleChange(arr, i))
		recipeDropdown.appendChild(dropdownItem)
	}
	return recipeDropdown
}

// populates the recipe card with details
function handleChange(object, i) {
	var randomEl = document.createElement('div')
	randomEl.textContent = object[i].description
	recipeDetailsContainerEl.appendChild(randomEl)
	console.log('hi')
	return recipeDetailsContainerEl
}

buttonEl.addEventListener('click', fetchRecipe())
fetchRecipe()

// object properties that we are using to display as data
// console.log(arr[i].name)
// console.log(arr[i].description)
// console.log(arr[i].num_servings)
// console.log(arr[i].thumbnail_url)
// console.log(arr[i].prep_time_minutes)

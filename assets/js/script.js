var tastyURL = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes`
var tastyDev = './data.json'

// query select elements
var recipeContainerEl = document.querySelector('#recipeContainer')

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '74e6ae4b12mshf87161aa2327b81p1e302ajsnfd1c233f30e7',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
	},
}

function fetchRecipe() {
	fetch(tastyURL, options)
		.then((response) => response.json())
		.then((response) => {
			console.log(response.results)
			return response.results
		})
		.then((data) => handleResults(data))
		.catch((err) => console.error(err))
	window.location.assign('/results.html')
}

function handleResults(arr) {
	for (var i = 19; i < arr.length; i++) {
		console.log(arr[i].name)
		console.log(arr[i].description)
		console.log(arr[i].num_servings)
		console.log(arr[i].thumbnail_url)
		console.log(arr[i].prep_time_minutes)
		var recipeNameEl = document.createElement('')
	}
	return
}

var buttonEl = document.querySelector('#searchBtn')
buttonEl.addEventListener('click', () => fetchRecipe())

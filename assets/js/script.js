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
}



function fetchYelp(){
	var zipCode = ''//TODO: zipcode from local storage
	var yelpURL = `https://serpapi.com/search.json?engine=yelp&find_desc=grocery+store&find_loc=${zipCode}`
	fetch(yelpURL)
	.then(response => response.json())
}


buttonEl = document.querySelector('#searchBtn')

buttonEl.addEventListener('click', fetchRecipe())


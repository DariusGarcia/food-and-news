var zipCode
var yelpURL = `https://serpapi.com/search.json?engine=yelp&find_desc=grocery+store&find_loc=${zipCode}`
var tastyURL = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes`

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
		.then((response) => console.log(response))
		.catch((err) => console.error(err))
}

function fetchYelp
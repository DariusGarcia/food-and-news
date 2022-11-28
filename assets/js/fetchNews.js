var newsAPIKey = 'cs7wlC4fGcduhcWkevNeksL97S7VQIgfW4W2Cynp'
var newsURL = `https://api.thenewsapi.com/v1/news/top?api_token=${newsAPIKey}&locale=us&limit=2`

fetch(newsURL)
	.then((response) => response.json())
	.then((data) => {
		console.log(data['data'][1]['description'])
		console.log(data['data'][1]['title'])
		console.log(data['data'][1]['title'])
		console.log(data['data'][1]['url'])
		console.log(data['data'][1]['categories'])
	})

// API endpoint queries
// data[i].title
// data[i].description
// data[i].url
// data[i].image_url
// data[i].categories
// data[i].language
// data[i].snippet

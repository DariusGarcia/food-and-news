const newsAPIKey = 'cs7wlC4fGcduhcWkevNeksL97S7VQIgfW4W2Cynp'
const limit = 5
const newsURL = `https://api.thenewsapi.com/v1/news/top?api_token=${newsAPIKey}&locale=us&limit=${limit}`
const devURL = '../newsData.json'

function fetchNews(event) {
	event.preventDefault()
	fetch(devURL)
		.then((response) => response.json())
		.then((data) => displayNewsData(data))
}
var newsContainerEl = document.querySelector('#news-wrapper')

// function to populate the news container section with individual news articles
function displayNewsData(data) {
	for (var i = 0; i < data.data.length; i++) {
		var newsTitleEl = document.createElement('h2')
		newsTitleEl.textContent = data.data[i].title
		var newsDescriptionEl = document.createElement('p')
		newsDescriptionEl.textContent = data.data[0].description
		var newsUrlEl = document.createElement('a')
		newsUrlEl.textContent = data.data[i].url
		var newsImageEl = document.createElement('img')
		newsImageEl.src = data.data[i].image
		var newsCategoriesEl = document.createElement('p')
		newsCategoriesEl.textContent = data.data[i].categories
		var newsSnippetEl = document.createElement('p')
		newsSnippetEl.textContent = data.data[0].snippet

		newsTitleEl.setAttribute('id', 'news-title')
		newsDescriptionEl.setAttribute('id', 'news-description')
		newsUrlEl.setAttribute('id', 'news-url')
		newsImageEl.setAttribute('id', 'news-image')
		newsImageEl.setAttribute('src', data.data[i].image_url)
		newsCategoriesEl.setAttribute('id', 'news-categories')
		newsSnippetEl.setAttribute('id', 'news-snippet')

		newsContainerEl.appendChild(newsTitleEl)
		newsContainerEl.appendChild(newsDescriptionEl)
		newsContainerEl.appendChild(newsUrlEl)
		newsContainerEl.appendChild(newsImageEl)
		newsContainerEl.appendChild(newsCategoriesEl)
		newsContainerEl.appendChild(newsSnippetEl)
	}
}

var newsSearchBtn = document.querySelector('#news-search-btn')
newsSearchBtn.addEventListener('click', fetchNews)

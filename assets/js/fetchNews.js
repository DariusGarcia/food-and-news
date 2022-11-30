const newsAPIKey = 'cs7wlC4fGcduhcWkevNeksL97S7VQIgfW4W2Cynp'
const limit = 2
const newsURL = `https://api.thenewsapi.com/v1/news/top?api_token=${newsAPIKey}&locale=us&limit=${limit}`
const devURL = '../newsData.json'

function fetchNews(event) {
	event.preventDefault()
	fetch(devURL)
		.then((response) => response.json())
		.then((data) => displayNewsData(data))
}
const newsContainerEl = document.querySelector('#news-wrapper')

// function to populate the news container section with individual news articles
function displayNewsData(data) {
	for (var i = 0; i < data.data.length; i++) {
		let newsCardEl = document.createElement('article')
		newsCardEl.setAttribute('id', 'news-card-article')

		let newsTitleEl = document.createElement('h2')
		newsTitleEl.textContent = data.data[i].title
		let newsDescriptionEl = document.createElement('a')
		newsDescriptionEl.textContent = data.data[i].description
		let newsUrlEl = document.createElement('a')
		newsUrlEl.textContent = data.data[i].url
		let newsImageEl = document.createElement('img')
		newsImageEl.src = data.data[i].image
		let newsCategoriesEl = document.createElement('p')
		newsCategoriesEl.textContent = data.data[i].categories

		newsTitleEl.setAttribute('id', 'news-title')
		newsDescriptionEl.setAttribute('id', 'news-description')
		newsDescriptionEl.setAttribute('href', data.data[i].url)
		newsDescriptionEl.setAttribute('target', '_blank')
		newsUrlEl.setAttribute('id', 'news-url')
		newsImageEl.setAttribute('id', 'news-image')
		newsImageEl.setAttribute('src', data.data[i].image_url)
		newsCategoriesEl.setAttribute('id', 'news-categories')

		newsCardEl.appendChild(newsTitleEl)
		newsCardEl.appendChild(newsDescriptionEl)
		newsCardEl.appendChild(newsImageEl)
		newsCardEl.appendChild(newsCategoriesEl)
		newsContainerEl.appendChild(newsCardEl)
	}
}

let newsSearchBtn = document.querySelector('#news-search-btn')
newsSearchBtn.addEventListener('click', fetchNews)

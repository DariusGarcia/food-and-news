var newsAPIKey = 'cs7wlC4fGcduhcWkevNeksL97S7VQIgfW4W2Cynp'
var newsURL = `https://api.thenewsapi.com/v1/news/top?api_token=${newsAPIKey}&locale=us&limit=2`

function fetchNews(event) {
  event.preventDefault()
  fetch(newsURL)
	.then((response) => response.json())
	.then((data) =>  handleNewsFetch(data)
	)
}
var newsContainerEl = document.querySelector('#news-section')

function handleNewsFetch(data){
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
    newsContainerEl.appendChild(newsTitleEl)
    newsContainerEl.appendChild(newsDescriptionEl)
    newsContainerEl.appendChild(newsUrlEl)
    newsContainerEl.appendChild(newsImageEl)
    newsContainerEl.appendChild(newsCategoriesEl)
    newsContainerEl.appendChild(newsSnippetEl)

    newsTitleEl.setAttribute('id', 'news-title')
    newsDescriptionEl.setAttribute('id', 'news-description')
    newsUrlEl.setAttribute('id', 'news-url')
    newsImageEl.setAttribute('id', 'news-image')
    newsImageEl.setAttribute('href', data.data[i].image_url)
    newsCategoriesEl.setAttribute('id', 'news-categories')
    newsSnippetEl.setAttribute('id', 'news-snippet')
  }

}

var newsSearchBtn = document.querySelector('#news-search-btn')
newsSearchBtn.addEventListener('click', fetchNews)


// API endpoint queries
// data[i].title
// data[i].description
// data[i].url
// data[i].image_url
// data[i].categories
// data[i].snippet
//data['data'][1]['description'
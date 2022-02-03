import { COLLECTION } from './collection.js'

const cardContainer = document.querySelector('.cards-container')

const makeElementWithClass = (el, className) => {
    const element = document.createElement(el)
    element.classList.add(className)

    return element
}

COLLECTION.forEach(item => {
    const article = makeElementWithClass('article', 'card')
    cardContainer.appendChild(article)

    article.insertAdjacentHTML('afterbegin',
        `<div class="book-img" style="background-image: linear-gradient(to bottom, rgba(0 0 0 / 0) 0%, rgba(0 0 0 / .4) 100%), url('${item.cover}');">
            <h2 class="book-title" title="${item.name}">${item.name}</h2>
        </div>
        <div class="card-tags">
            <span class="book-type">${item.type}</span>
            ${getItemGenre()}
        </div>
    
        <div class="book-author">${item.author}</div>
        <div class="book-original-title">${item.originalTitle ? item.originalTitle + ' ' : ' '}<span class="book-language">(${item.language})</span></div>
    
        <div class="book-awards">This book won ${item.awards.length} award${item.awards.length > 1 ? 's:' : item.awards.length > 0 ? ':' : '.'}
            ${getAwards()}
        </div>
        `)

    function getItemGenre() {
        if (item.genre) {
            return `<span class="book-genre">${item.genre}</span>`
        } else {
            return ''
        }
    }
    
    function getAwards() {
        const bookAwardsList = makeElementWithClass('ul', 'book-awards-list')
        bookAwardsList.style.display = item.awards.length > 0 ? 'block' : 'none'
   
        item.awards.forEach(award => {
            const bookAwardsItem = makeElementWithClass('li', 'book-awards-item')
            bookAwardsItem.textContent = award
            bookAwardsList.appendChild(bookAwardsItem)
        })
        
        return bookAwardsList.outerHTML
    }
})

const search = document.querySelector('input[type="search"]')


search.addEventListener('keyup', function(e) {
    for (let card of cardContainer.children) {
        if (card.innerHTML.toLowerCase().includes(search.value.toLowerCase())) {
            card.style.display = "block"
        } else {
            card.style.display = "none"
        }
    }
})
document.addEventListener("DOMContentLoaded", function() {
    console.log('DOM CONNECTED')
    getAllBooks()
    getListItem().addEventListener('click', renderShowPanel)
});

function getAllBooks() {
    fetch("http://localhost:3000/books")
    .then(response => response.json())
    .then(data => data.forEach(book => renderBookTitles(book)))
}

function renderBookTitles(book) {
    let listPanel = document.getElementById('list')
    let listItem = document.createElement('li')
    listItem.className += "book-titles"
    listItem.innerText = book.title

    listItem.dataset.id = book.id

    listPanel.appendChild(listItem)

}

function renderShowPanel(event){
    bookId = event.target.dataset.id
    fetch("http://localhost:3000/books/" + bookId)
    .then(response => response.json())
    .then(data => showPanelCard(data))
}

function showPanelCard(data){
    let showPanel = document.getElementById('show-panel')
    let showCard = document.createElement('div')
    showPanel.appendChild(showCard)
    
    let title = document.createElement('h2')
    title.innerText = data.title
    showCard.appendChild(title)
}

function getListItem() {
    return document.getElementById('list')
}
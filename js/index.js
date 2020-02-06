document.addEventListener("DOMContentLoaded", () => {
    console.log("connected to the DOM")
    getBooks()
});

//fetching
function getBooks(){
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(books => books.forEach(book => renderBookList(book)))
}

//building page
function renderBookList(book){
    let li = document.createElement('li')
    li.dataset.bookId = book.id
    li.innerText = book.title
    listElement().appendChild(li)
    li.addEventListener("click", () => bookHandler(book))
}

//finding elements
function listElement(){
    return document.getElementById("list")
}

function bookPage(){
    return document.getElementById("show-panel")
}

//handlers
function bookHandler(book){
    let bookTitle = document.createElement("h2")
    let bookImg = document.createElement("img")
    let bookDes = document.createElement("p")
    let bookBtn = document.createElement("button")
    let likedBookUsers = document.createElement("ul")
    likedBookUsers.id = "book-likes"

    clearDiv(bookPage())
    bookPage().append(bookTitle, bookImg, bookDes, bookBtn, likedBookUsers)
    
    bookTitle.innerText = book.title
    bookImg.src = book.img_url
    bookDes.innerText = book.description
    bookBtn.dataset.id = book.id
    bookBtn.innerText = "Like This Book"


    book.users.forEach(user => likedUserList(user))

    bookBtn.addEventListener("click", () => {
        book.users.push({"id":1, "username":"pouros"})
        likeUserHandler(book)})
}


function likedUserList(user){
 
    let userListItem = document.createElement("li")
    let likedList = document.getElementById("book-likes")
    likedList.appendChild(userListItem)

    userListItem.innerText = user.username
}

function likeUserHandler(book){
    console.log("liking book")
    let bookId = parseInt(event.target.dataset.id)
    fetch("http://localhost:3000/books/" + bookId, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(book)
    }).then(res => res.json())
     .then(book => bookHandler(book))
}


function clearDiv(div){
    while(div.firstChild){
        div.firstChild.remove()
    }
}
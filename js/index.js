//To use this application you need to enter the two below texts into the terminal
//     npm install -g json-server
//     json-server db.json
// const likeButton = document.createElement('button')
// likeButton.addEventListener('click', () => likeButtonClicked(bookInfo))


document.addEventListener("DOMContentLoaded", function() {


    fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(data => {
        data.filter(book => renderBooks(book))
    })
    .catch(function(error) {
        console.log(error)
    })

});

    function renderBooks(book) {
        const ul = document.querySelector("#list")
        const li = document.createElement('li')
        const bookName = book.title
        li.id = book.id
        li.innerText = bookName
        ul.appendChild(li)
        li.addEventListener('click', fetchBookInfo)
    }

    function fetchBookInfo(e) {
        const div = document.getElementById('show-panel')
        div.innerHTML = '';
        const bookId = e.target.id

        fetch(`http://localhost:3000/books/${bookId}`)
        .then(response => response.json())
        .then(bookInfo => showBookInfo(bookInfo))
        .catch(function(error) {
            console.log(error)
        })
    }

    function showBookInfo(bookInfo) {

        //console.log(bookInfo.users)
        const div = document.getElementById('show-panel')
        div.innerHTML = ""
        const bookImageDiv = document.createElement('div')
        const bookImage = document.createElement('img')
        const h1 = document.createElement('h1')
        const h1Two = document.createElement('h1')
        const h1Three = document.createElement('h1')
        const p = document.createElement('p')
        const likeButton = document.createElement('button')
        div.appendChild(bookImageDiv)
        bookImage.src = bookInfo.img_url
        bookImageDiv.appendChild(bookImage)
        bookImageDiv.appendChild(h1)
        h1.innerText = bookInfo.title
        bookImageDiv.appendChild(h1Two)
        h1Two.innerText = bookInfo.subtitle
        bookImageDiv.appendChild(h1Three)
        h1Three.innerText = bookInfo.author
        bookImageDiv.appendChild(p)
        p.innerText = bookInfo.description

        for (i = 0; i < bookInfo.users.length; i++) {
            //console.log(bookInfo.users[i].username)
            //console.log(bookInfo.users[i])
            const userLi = document.createElement('li')
            bookImageDiv.appendChild(userLi)
            userLi.innerText = bookInfo.users[i].username
        }
        

        bookImageDiv.appendChild(likeButton)
        likeButton.innerText = "like"
        likeButton.addEventListener('click', () => likeButtonClicked(bookInfo))
    }

    function likeButtonClicked(bookInfo){
        const id = bookInfo.id
        const userObject =  {"id":1, "username":"pouros"}
        const updatedUsers = bookInfo.users.map(updatedUser => {
            
            return updatedUser
        })
        updatedUsers.push(userObject) //this pushes the updatedUsers into the userObject
        
        
        
        const configurationObject = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                
                    "users": updatedUsers

            })
        }

            fetch(`http://localhost:3000/books/${id}`, configurationObject)
            .then(response => {
                return response.json()
                })
            .then(newBookInfo => {
                showBookInfo(newBookInfo)})
            .catch(function(error) {
                console.log(error)
            })
    }



window.addEventListener('DOMContentLoaded', (event) => {
    const input = document.querySelector('input');
    const button = document.querySelector('button');
    const booksList = document.getElementById('books-list');

    const renderBooks = (book) => {        
        let li = document.createElement('li');        
        let col = document.createElement('div');
        let singleBookRow = document.createElement('div');        
        let bookTitle = document.createElement('h2');
        let bookAuthors = document.createElement('h3');
        let bookDescription = document.createElement('p');
        let bookThumbnail = document.createElement('img');      

        bookTitle.textContent = book.volumeInfo.title;
        bookAuthors.textContent = book.volumeInfo.authors;
        bookDescription.textContent = book.volumeInfo.description ? book.volumeInfo.description : " Sorry no description";
        bookThumbnail.src = book.volumeInfo.imageLinks ? 
            book.volumeInfo.imageLinks.thumbnail : "./img/nopicture.gif"
        
        col.appendChild(bookTitle);
        col.appendChild(bookAuthors);
        col.appendChild(bookDescription);
        singleBookRow.appendChild(bookThumbnail);
        singleBookRow.appendChild(col);
        li.appendChild(singleBookRow);

        li.classList.add('list-group-item');
        singleBookRow.classList.add('row');
        col.classList.add('col-md-10');
        bookThumbnail.classList.add('col-md-2', 'rwd');
            
        booksList.appendChild(li);
    }

    const prefomSearch = () => {
        if(input.value.length === 0) {
            alert('Please enter some book');
        } else {
            booksList.innerHTML = "";
            const serachBook = input.value;
            const searchURI = `https://www.googleapis.com/books/v1/volumes?q=${serachBook}&printType=books`; 
            
            fetch(searchURI)
            .then(resp => resp.json())
            .then(resp => {
                return resp.items.map(book => renderBooks(book))   
            } )   
            .catch((err) => {
                console.log(`Fetch api error: ${err}`);       
            }); 
        }                 
        input.value = input.defaultValue;
    }

    button.addEventListener("click", () => {
        prefomSearch();
    });

    input.addEventListener("keyup", (e => {
        if (e.keyCode === 13) {
            prefomSearch();
        }        
    }));
});
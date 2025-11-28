const container = document.getElementById("container");
const newButton = document.getElementById("new");
const input = document.getElementById("input")

// dummy variable to check if there's already a new book form active
let inputCheck = "";

// array to store book objects
const myLibrary = [];

// class to create book objects and methods to perform on those objects
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages + " pages";
        this.read = read;
        this.id = crypto.randomUUID();
    };

    addBookToLibrary(library) {
        library.push(this);
    };

    removeBook(array, id) {
        const index = array.findIndex(obj => obj.id === id);
        if (index !== -1) {
            array.splice(index, 1);
        } return array;
    };

    switchReadStatus(status) {
        if (status.textContent === "Read") {
            status.classList = "not-read";
            status.textContent = "Not Read";
        } else if (status.textContent === "Not Read") {
            status.classList = "read";
            status.textContent = "Read";
        };
    };
};

// default books in library
const book1 = new Book("The Hobbit", "JRR Tolkien", "300", "Not Read");
const book2 = new Book("Lord of the Rings", "JRR Tolkien", "1178", "Not Read");
const book3 = new Book("Artemis Fowl", "Eoin Colfer", "320", "Read");
book1.addBookToLibrary(myLibrary);
book2.addBookToLibrary(myLibrary);
book3.addBookToLibrary(myLibrary);


// button event to create input form
newButton.addEventListener("click", () => {
    // if statement checks to see if input form is already open
    if (inputCheck === "") {
        inputCheck = "checked"

        const createForm = document.createElement("form");

        const titleDiv = document.createElement("div");
        const authorDiv = document.createElement("div");
        const pagesDiv = document.createElement("div");
        const readDiv = document.createElement("div");

        const titleLabel = document.createElement("label");
        titleLabel.for = "title";
        titleLabel.textContent = "Title:";

        const inputTitle = document.createElement("input");
        inputTitle.type = "text";
        inputTitle.id = "title";
        inputTitle.name = "title";

        const authorLabel = document.createElement("label");
        authorLabel.for = "author";
        authorLabel.textContent = "Author:";

        const inputAuthor = document.createElement("input");
        inputAuthor.type = "text";
        inputAuthor.id = "author";
        inputAuthor.name = "author";

        const pagesLabel = document.createElement("label");
        pagesLabel.for = "pages";
        pagesLabel.textContent = "# of Pages:";

        const inputPages = document.createElement("input");
        inputPages.type = "number";
        inputPages.min = "1";
        inputPages.max = "41000";
        inputPages.id = "pages";
        inputPages.name = "pages";

        const readLabel = document.createElement("label");
        readLabel.for = "read";
        readLabel.textContent = "Read?";

        const inputRead = document.createElement("input");
        inputRead.type = "checkbox";
        inputRead.id = "read";
        inputRead.name = "read";

        const submitButton = document.createElement("button");
        submitButton.id = "submit";
        submitButton.textContent = "Submit";

        submitButton.addEventListener("click", () => {
            const getTitle = document.getElementById("title");
            const getAuthor = document.getElementById("author");
            const getPages = document.getElementById("pages");
            const getRead = document.getElementById("read");
            const title = getTitle.value;
            const author = getAuthor.value;
            const pages = getPages.value;
            let read = "";

            if (getRead.checked) {
                read = "Read";
            } else {
                read = "Not Read";
            };

            const book = new Book(title, author, pages, read);
            book.addBookToLibrary(myLibrary);
            
            input.removeChild(createForm);
            input.removeChild(submitButton);

            displayLibrary();
            inputCheck = "";
        });

        titleDiv.append(titleLabel, inputTitle);
        authorDiv.append(authorLabel, inputAuthor);
        pagesDiv.append(pagesLabel, inputPages);
        readDiv.append(readLabel, inputRead)
        createForm.append(titleDiv, authorDiv, pagesDiv, readDiv);

        input.appendChild(createForm);
        input.appendChild(submitButton);

    } else if (inputCheck === "checked") {
        ;
    };
});

// function to output the library book objects as cards in the container div
function displayLibrary() {
        container.innerHTML = "";

        myLibrary.forEach((book) => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("card");

        const itemID = book.id;

        const itemTitle = document.createElement("p");
        const itemAuthor = document.createElement("p");
        const itemPages = document.createElement("p");
        const itemRead = document.createElement("button");
        const itemDelete = document.createElement("button");
        itemTitle.textContent = "Title: " + book.title;
        itemAuthor.textContent = "Author: " + book.author;
        itemPages.textContent = book.pages;
        itemRead.textContent = book.read;
        itemDelete.textContent = "Delete";

        if (itemRead.textContent === "Read") {
            itemRead.classList = "read";
        } else if (itemRead.textContent === "Not Read") {
            itemRead.classList = "not-read";
        };

        itemRead.addEventListener("click", () => {
            book.switchReadStatus(itemRead);
        });

        itemDelete.addEventListener("click", () => {
            book.removeBook(myLibrary, itemID);
            displayLibrary();
        });

        bookItem.append(itemTitle, itemAuthor, itemPages, itemRead, itemDelete);

        container.appendChild(bookItem);
    });
};

displayLibrary();
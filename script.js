const container = document.getElementById("container");
const input = document.getElementById("input");
const form = document.getElementById("new-book");
const submitButton = document.getElementById("submit");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");

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

// button event to check if input form is valid, and if so creates a new book object
submitButton.addEventListener("click", () => {
    if (form.reportValidity()) {
        let isRead = "";

        if (read.checked) {
            isRead = "Read";
        } else {
            isRead = "Not Read";
        };

        const book = new Book(title.value, author.value, pages.value, isRead);
        book.addBookToLibrary(myLibrary);

        form.reset();

        displayLibrary();

// custom validation checks for Title, Author and Page input fields
    } else {
        if (title.validity.valueMissing) {
            title.setCustomValidity("Please put in the Book Title");
        } else {
            title.setCustomValidity("");
        };

        if (author.validity.valueMissing) {
            author.setCustomValidity("Please put in Author's Name");
        } else {
            author.setCustomValidity("");
        };

        if (pages.validity.valueMissing) {
            pages.setCustomValidity("Please put in a number between 1 and 41000");
        } else {
            pages.setCustomValidity("");
            if (pages.validity.rangeUnderflow) {
                pages.setCustomValidity("this number must be greater than or equal to 1");
            } else if (pages.validity.rangeOverflow) {
                pages.setCustomValidity("this number must be less than 41000");
            } else {
                pages.setCustomValidity("");
            };
        };
    };
});

// function to output the library book objects as cards in the container div
function displayLibrary() {
    container.innerHTML = "";

    myLibrary.forEach((book) => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("card");

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
            book.removeBook(myLibrary, book.id);
            displayLibrary();
        });

        bookItem.append(itemTitle, itemAuthor, itemPages, itemRead, itemDelete);

        container.appendChild(bookItem);
    });
};

displayLibrary();
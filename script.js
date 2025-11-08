const container = document.getElementById("container");
const newButton = document.getElementById("new");
const input = document.getElementById("input")

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages + " pages";
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

addBookToLibrary("The Hobbit", "JRR Tolkien", "300", "Not Read");
addBookToLibrary("Lord of the Rings", "JRR Tolkien", "1000", "Not Read");
addBookToLibrary("Artemis Fowl", "Eoin Colfer", "400", "Read");

newButton.addEventListener("click", () => {
    const createForm = document.createElement("form");

    const titleLabel = document.createElement("label")
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
            read = "Read"
        } else {
            read = "Not read"
        }

        addBookToLibrary(title, author, pages, read);
        
        input.removeChild(createForm);
        input.removeChild(submitButton);

        displayLibrary();
    });

    input.appendChild(createForm);
    input.appendChild(submitButton);

    createForm.append(titleLabel, inputTitle, authorLabel, inputAuthor, pagesLabel, inputPages, readLabel, inputRead);
});

function displayLibrary() {
        container.innerHTML = "";

        myLibrary.forEach((book) => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("card")

        const itemTitle = document.createElement("p");
        const itemAuthor = document.createElement("p");
        const itemPages = document.createElement("p");
        const itemRead = document.createElement("button");
        itemTitle.textContent = book.title;
        itemAuthor.textContent = book.author;
        itemPages.textContent = book.pages;
        itemRead.textContent = book.read;

        bookItem.append(itemTitle, itemAuthor, itemPages, itemRead)

        container.appendChild(bookItem)
    });
};

displayLibrary();
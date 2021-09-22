import { Book } from "./book.js";
import { Library } from "./library.js";

const containerTemplate = document.createElement("div");
containerTemplate.className = "item-container";
const spanTemplate = document.createElement("span");
const readStatusTemplate = document.createElement("span");
readStatusTemplate.className = "read-status";
readStatusTemplate.innerHTML = `<span>Read</span>
<label class="switch">
    <input type="checkbox">
    <span class="slider"></span>
</label>`;
const removeBtnTemplate = document.createElement("button");
removeBtnTemplate.className = "remove-btn";
removeBtnTemplate.textContent = "Remove";

const main = document.querySelector("main");
main.addEventListener("click", handleMainClick);

// init
const lib = new Library();
lib.LoadBooks();
if (lib.books.length === 0) {
    lib.AddBook(new Book("test", "test", 12, false));
}

for (let i = 0; i < lib.books.length; i++) {
    DisplayBook(lib.books[i]);
}

/**
 * @param {Book} book 
 */
function DisplayBook(book) {
    const container = containerTemplate.cloneNode();
    const title = spanTemplate.cloneNode();
    const author = spanTemplate.cloneNode();
    const pages = spanTemplate.cloneNode();
    const readStatus = readStatusTemplate.cloneNode(true);
    const removeBtn = removeBtnTemplate.cloneNode(true);

    title.textContent = `Title: ${book.title}`;
    author.textContent = `Author: ${book.author}`;
    pages.textContent = `Pages: ${book.pages}`;
    readStatus.querySelector("input").checked = book.readStatus;
    readStatus.querySelector(".slider").dataset.id = book.id;
    removeBtn.dataset.id = book.id;

    container.appendChild(title);
    container.appendChild(author);
    container.appendChild(pages);
    container.appendChild(readStatus);
    container.appendChild(removeBtn);

    main.appendChild(container);
}

/**
 * @param {event} event 
 */
function handleMainClick(event) {
    const target = event.target;
    const id = parseInt(target.dataset.id);
    if (target.classList.contains("slider")) {
        lib.ChangeReadStatus(id);
    }
    else if (target.classList.contains("remove-btn")) {
        lib.RemoveBook(id);
        target.parentNode.remove();
    }

    if (target.id === "add-icon") {
        target.style.display = "none";
        target.nextElementSibling.style.display = "flex";
    }
    else if(target.id === "add-btn") {
        event.preventDefault();
    }
}
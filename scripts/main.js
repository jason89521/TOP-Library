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
const addContainer = document.getElementById("add-container");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
main.addEventListener("click", HandleMainClick);
modal.addEventListener("click", HandleModalClick);
modalContent.addEventListener("transitionend", HandleModalContentTransitionend);

// init
const lib = new Library();
lib.LoadBooks();
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

    main.insertBefore(container, addContainer.nextSibling);
}

/**
 * @param {event} event 
 */
function HandleMainClick(event) {
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
        target.nextElementSibling.style.display = "";
    }
    else if(target.id === "add-btn") {
        event.preventDefault();
        const form = document.getElementById("add-form");
        for(let i = 0; i < 3; i++) {
            if(form[i].value === ""){
                DisplayAlertPanel();
                return;
            }
        }

        const title = form[0].value;
        const author = form[1].value;
        const pages = parseInt(form[2].value);
        const readStatus = form[3].checked;
        const newBook = new Book(title, author, pages, readStatus);
        lib.AddBook(newBook);
        DisplayBook(newBook);
        document.getElementById("add-form").style.display = "none";
        document.getElementById("add-icon").style.display = "";
        form.reset();
    }
}

function DisplayAlertPanel() {
    modal.style.display = "";
}

function HandleModalClick() {
    modalContent.classList.add("scale-leave");
}

function HandleModalContentTransitionend() {
    modal.style.display = "none";
    modalContent.classList.remove("scale-leave");
}
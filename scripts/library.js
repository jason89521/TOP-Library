import { Book } from "./book.js";

class Library {
    constructor() {
        this.books = [];
        this.date = new Date();
    }

    /**
     * @param {Book} book
     */
    AddBook = function (book) {
        this.books.push(book);
        localStorage.setItem(book.id, JSON.stringify(book));
    };

    /**
     * @param {number} id
     */
    RemoveBook = function (id) {
        const toRemove = this.findBook(id);

        if (toRemove) {
            const index = this.books.indexOf(toRemove);
            if (index > -1) {
                localStorage.removeItem(id.toString());
                this.books.splice(index, 1);
            }
        }
    };

    /**
     * @param {number} id
     */
    ChangeReadStatus = function (id) {
        const toChange = this.findBook(id);

        if (toChange) {
            toChange.ToggleReadStatus();
            localStorage.setItem(id.toString(), JSON.stringify(toChange));
        }
    };

    LoadBooks = function () {
        if (this.books.length > 0)
            return;

        let keys = Object.keys(localStorage);

        for (let i = 0; i < keys.length; i++) {
            const bookJSON = JSON.parse(localStorage.getItem(keys[i]));
            const book = new Book(bookJSON.title,
                bookJSON.author, bookJSON.pages,
                bookJSON.readStatus, bookJSON.id);
            this.books.push(book);
        }
    };

    findBook = function (id) {
        const target = this.books.find((book) => {
            return book.id === id;
        });
        return target;
    };
}

export { Library }
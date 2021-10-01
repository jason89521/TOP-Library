/**
 * @param {string} title 
 * @param {string} author 
 * @param {number} pages 
 * @param {boolean} readStatus
 */
class Book {
    constructor(title, author, pages, readStatus, id) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
        this.id = (id) ? id : (new Date()).getTime();
    }
    ToggleReadStatus() {
        this.readStatus = !this.readStatus;
    }
}


export {Book};
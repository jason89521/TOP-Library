/**
 * @param {string} title 
 * @param {string} author 
 * @param {number} pages 
 * @param {boolean} readStatus
 */
function Book(title, author, pages, readStatus, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.id = (id) ? id : (new Date()).getTime();
}

Book.prototype.ToggleReadStatus = function () {
    this.readStatus = !this.readStatus;
}

export {Book};
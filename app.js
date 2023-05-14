const form = document.getElementById("form");
const addBtn = document.getElementById("addBtn");
const closeBtn = document.getElementById("closeBtn");
const confirmBtn = document.getElementById("confirmBtn");
const bookDisplay = document.querySelector(".book-container");
const numDisplay = document.querySelector(".numBooks");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");

addBtn.addEventListener("click", () => form.style.display = "block");
closeBtn.addEventListener("click", () => resetForm());

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  resetForm();
});

let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary() {
  let book = new Book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(book);
  addToDisplay(book);
  updateNum();
}

function resetForm() {
  title.value = '';
  author.value = '';
  pages.value = '';
  form.style.display = "none";
}

function addToDisplay(book) {
  const createdBook = document.createElement("div");
  createdBook.classList.toggle("book");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const readLabel = document.createElement("label");
  const read = document.createElement("input");
  read.setAttribute("type", "checkbox");
 
  title.textContent = book.title;
  author.textContent = "by " + book.author;
  let str = book.pages == 1 ? " pg" : " pgs"
  pages.textContent = "Length: " + book.pages + str;
  readLabel.textContent = "Cleared:";
  read.checked = book.read;

  createdBook.append(title, author, pages, readLabel, read);
  bookDisplay.appendChild(createdBook);
}

function updateNum() {
  let str = myLibrary.length == 1 ? ' book' : ' books';
  numDisplay.textContent = 'Currently has ' + myLibrary.length + str;
}

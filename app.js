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
retrieveData();

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = -1;
  }
}

function addBookToLibrary() {
  let book = new Book(title.value, author.value, pages.value, read.checked);
  let len = myLibrary.push(book);
  book.index = len - 1;
  addToDisplay(book);
}

function resetForm() {
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
  form.style.display = "none";
}

function addToDisplay(book) {
  const createdBook = document.createElement("div");
  createdBook.classList.toggle("book");
  
  const title = document.createElement("div");
  const author = document.createElement("div");
  const pages = document.createElement("div");
  const readLabel = document.createElement("label");
  const readStatus = document.createElement("div");
  const read = document.createElement("input");
  read.setAttribute("type", "checkbox");
  const removeBtn = document.createElement("button");
  
 
  title.textContent = book.title;
  author.textContent = "by " + book.author;
  let str = book.pages == 1 ? " pg" : " pgs"
  pages.textContent = "Length: " + book.pages + str;
  readLabel.textContent = "Cleared:";

  read.checked = book.read;
  read.classList.toggle("read");
  read.addEventListener("click", () => {
    myLibrary[removeBtn.getAttribute("id")].read = read.checked;
    toggleDisplayColor(book.index);
    saveData();
  });

  removeBtn.innerHTML = "Remove";
  removeBtn.setAttribute("id", book.index);
  removeBtn.classList.toggle("removeBtn");
  removeBtn.addEventListener("click", () => {
    removeBook(removeBtn.getAttribute("id"));
    saveData();
  });
  
  readStatus.append(readLabel, read);
  createdBook.append(title, author, pages, readStatus, removeBtn);
  bookDisplay.appendChild(createdBook);

  saveData();
  toggleDisplayColor(book.index);
  updateNum();
}

function updateNum() {
  let str = myLibrary.length == 1 ? ' book' : ' books';
  numDisplay.textContent = 'Currently has ' + myLibrary.length + str;
}

function removeBook(index) {
  const selectedBook = document.getElementById(index).parentElement;
  bookDisplay.removeChild(selectedBook);
  myLibrary.splice(index, 1);
  const remainingBtns = document.querySelectorAll(".removeBtn");
  for (let i = 0; i < remainingBtns.length; i++) {
    myLibrary[i].index = i;
    remainingBtns[i].setAttribute("id", i);
  }
  updateNum();
}

function toggleDisplayColor(index) {
  const selectedBook = document.getElementById(index).parentElement;
  const read = selectedBook.getElementsByClassName("read")[0];
  selectedBook.style.backgroundColor = read.checked ? "bisque" : "coral";
}

function saveData() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function retrieveData() {
  if (localStorage.myLibrary) {
    let savedArr = localStorage.getItem("myLibrary");
    savedArr = JSON.parse(savedArr);
    myLibrary = savedArr;
    for (let i = 0; i < myLibrary.length; i++) {
      addToDisplay(myLibrary[i]);
    }
  }
}

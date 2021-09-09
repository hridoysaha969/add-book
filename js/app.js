// Book Info Constractor
function Book(bookName, author, category) {
  this.bookName = bookName;
  this.author = author;
  this.category = category;
}

// Display Constractor
function Display() {}

// Add Method to Display Prototype
Display.prototype.add = function (book) {
  let bookList = document.getElementById("bookList");

  let uiString = `
  <tr>
      <td>${++serialNo}</td>
      <td>${book.bookName}</td>
      <td>${book.author}</td>
      <td>${book.category}</td>
  </tr>`;

  bookList.innerHTML += uiString;
};
Display.prototype.validate = function (book) {
  if (book.bookName.length < 2 || book.author.length < 2) {
    return false
  } else {
    return true;
  }
}
Display.prototype.show = function (type, messages) {
  let message = document.getElementById('msg');

  message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                          <strong>${messages}</strong>
                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`

  setTimeout(function () {
    message.innerHTML = ''
  }, 5000)
}

/// Add Submit add event listener
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);
let serialNo = 0;
let allBooks;

function libraryFormSubmit(e) {
  e.preventDefault();

  let bookName = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let type = document.getElementsByName("gridRadios");
  let category;
  let noBook = document.getElementById("noBook");

  // Selecting the target Option
  [...type].forEach((v) => {
    if (v.checked) {
      category = v.value;
    }
  });

  let bookRegx = /^[a-zA-Z]([0-9a-zA-z ]+){2,100}$/;
  let authRegx = /^[a-zA-Z]([a-zA-z ]+){2,50}$/;
  console.log(bookRegx.test(bookName))

  // Create New Object In Every Click
  let book = new Book(bookName, author, category);
  let display = new Display();

  if (bookRegx.test(bookName) && authRegx.test(author)) {
    // Hide Default Alert Message
    noBook.style.display = "none";
    display.add(book);
    //let display = new Display();
    libraryForm.reset();
    display.show('success', 'New book added Successfully');
  } else {
    console.log('Error!')
    display.show('danger', 'Something went wrong! Please try again');
  }
}


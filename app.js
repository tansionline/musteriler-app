// Musteri Class:
class Book {
  constructor(isim, tlf, kisa, bolge, butce, aciklama) {
    this.isim = isim;
    this.tlf = tlf;
    this.kisa = kisa;
    this.bolge = bolge;
    this.butce = butce;
    this.aciklama = aciklama;
  }
}

// UI Class: Handle UI Tasks
// 
class UI {
  static displayBooks() {
    const books = Store.getBook();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.isim}</td>
      <td>${book.tlf}</td>
      <td>${book.kisa}</td>
      <td>${book.bolge}</td>
      <td>${book.butce}</td>
      <td>${book.aciklama}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#isim').value = '';
    document.querySelector('#tlf').value = '';
    document.querySelector('#kisa').value = '';
    document.querySelector('#bolge').value = '';
    document.querySelector('#butce').value = '';
    document.querySelector('#aciklama').value = '';
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(aciklama) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.aciklama === aciklama) {
          books.splice(index, 1);
        }
      });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBook);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const isim = document.querySelector('#isim').value;
  const tlf = document.querySelector('#tlf').value;
  const kisa = document.querySelector('#kisa').value;
  const bolge = document.querySelector('#bolge').value;
  const butce = document.querySelector('#butce').value;
  const aciklama = document.querySelector('#aciklama').value;

  // Validate
  if(isim === '' || tlf === '' || kisa === '' || bolge === '' || butce === '' || aciklama === '') {
    UI.showAlert('Lütfen Bilgileri Giriniz!', 'danger');
  } else {
    // Instatiate book
    const book = new Book(isim, tlf, kisa, bolge, butce, aciklama);

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Show success message
    UI.showAlert('Müşteri Eklendi', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Müşteri Silindi', 'success');
});
  


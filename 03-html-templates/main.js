const books = [
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { title: 'A Farewell to Arms', author: 'Ernest Hemingway' },
  { title: 'Catch 22', author: 'Joseph Heller' }
];

function renderBooks() {
  const booksList = document.getElementById('books');
  const template = document.getElementById('book-template');
  booksList.innerHTML = '';
  books.forEach(book => {
    // element koristi sablon
    const element = document.importNode(template.content, true);
    element.querySelector('.title').innerHTML = book.title;
    element.querySelector('.author').innerHTML = book.author;
    booksList.appendChild(element);
  });
}

renderBooks();

import Service from '@ember/service';

export default class BookService extends Service {
  save(bookDTO) {
    return fetch('/api/books', {
      method: 'POST',
      body: JSON.stringify(bookDTO),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  update(bookDTO, bookId) {
    return fetch(`/api/books/${bookId}`, {
      method: 'PUT',
      body: JSON.stringify(bookDTO),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  delete(id) {
    return fetch(`/api/books/${id}`, {
      method: 'DELETE'
    });
  }
}

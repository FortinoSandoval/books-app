import Service from '@ember/service';

export default class BookService extends Service {
  delete(id) {
    return fetch(`/api/books/${id}`, {
      method: 'DELETE'
    });
  }
}

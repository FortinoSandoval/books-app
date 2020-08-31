import Service from '@ember/service';

export default class AuthorService extends Service {
  delete(id) {
    return fetch(`/api/authors/${id}`, {
      method: 'DELETE'
    });
  }
}

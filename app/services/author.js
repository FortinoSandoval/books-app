import Service from '@ember/service';

export default class AuthorService extends Service {
  getAuthors() {
    return fetch(`/api/authors/`).then(res => res.json());
  }

  delete(id) {
    return fetch(`/api/authors/${id}`, {
      method: 'DELETE'
    });
  }

  save(authorDTO) {
    return fetch('/api/authors', {
      method: 'POST',
      body: JSON.stringify(authorDTO),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  update(authorDTO, authorId) {
    return fetch(`/api/authors/${authorId}`, {
      method: 'PUT',
      body: JSON.stringify(authorDTO),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

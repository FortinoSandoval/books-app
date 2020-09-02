import { Response } from 'ember-cli-mirage';

export default function () {
  this.namespace = '/api';

  this.post('/login', (schema, { requestBody }) => {

    const { username, password } = requestBody;

    if (username === 'test' && password === 'test') {
      return true;
    } else {
      return new Response(400, {}, {
        errors: [
          {
            code: 'BAD_CREDENTIALS',
            message: 'Invalid credentials'
          }
        ]
      });
    }
  });

  this.get('/authors');

  this.get('/books', (schema, { queryParams }) => {
    const { authorId } = queryParams;

    if (authorId) {
      return schema.books.where({ authorId });
    }

    return schema.books.all();
  });


  this.post('/authors', (schema, request) => {
    let attrs = JSON.parse(request.requestBody);

    return schema.authors.create(attrs);
  });

  this.put('/authors/:id', (schema, request) => {
    let attrs = JSON.parse(request.requestBody);
    let id = request.params.id;

    return schema.authors.find(id).update(attrs);
  });

  this.post('/books', (schema, request) => {
    let attrs = JSON.parse(request.requestBody);

    return schema.books.create(attrs);
  });

  this.put('/books/:id', (schema, request) => {
    let attrs = JSON.parse(request.requestBody);
    let id = request.params.id;

    return schema.books.find(id).update(attrs);
  });

  this.del('/authors/:id', (schema, request) => {
    const authorId = request.params.id;
    schema.db.books.remove({ authorId });
  });
  this.get('/authors/:id');
  this.get('/books/:id');
  this.del('/books/:id');
}
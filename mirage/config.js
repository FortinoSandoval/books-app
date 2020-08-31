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


  // this.post('/authors');
  // this.put('/authors/:id');



  // this.post('/books');
  this.del('/authors/:id', (schema, request) => {
    const authorId = request.params.id;
    schema.db.books.remove({ authorId });
  });
  this.get('/authors/:id');
  this.get('/books/:id');
  this.del('/books/:id');
  // this.put('/books/:id');
}
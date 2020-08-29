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
  this.post('/authors');
  this.get('/authors/:id');
  this.put('/authors/:id');
  this.del('/authors/:id');

  this.get('/books');
  this.post('/books');
  this.get('/books/:id');
  this.put('/books/:id');
  this.del('/books/:id');
}
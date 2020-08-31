export default function (server) {
  server.createList('author', 10).forEach(author => {
    server.createList('book', Math.floor((Math.random() * 10) + 1), { author });
  });
}
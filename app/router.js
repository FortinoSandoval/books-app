import EmberRouter from '@ember/routing/router';
import config from 'books-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('authors');
  this.route('books');
});

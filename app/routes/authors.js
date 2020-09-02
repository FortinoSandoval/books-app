import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class AuthorsRoute extends Route {
  model() {
    return this.store.findAll('author');
  }

  @action
  authorSaved() {
    this.refresh();
  }
}

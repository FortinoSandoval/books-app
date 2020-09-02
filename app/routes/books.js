import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class BooksRoute extends Route {
  queryParams = {
    authorId: {
      refreshModel: true
    }
  };

  model(params) {
    if (params && params.authorId) {
      this.set('authorId', params.authorId);

      return this.store.query('book', {
        authorId: params.authorId
      });
    }
    return this.store.findAll('book');
  }

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('isFiltering', !!this.get('authorId'));
    controller.set('model', model);
  }

  @action
  queryReset() {
    this.transitionTo('books', {
      queryParams: {
        authorId: null
      }
    }).then(() => {
      this.set('controller.isFiltering', false);
    });
  }

  @action
  bookSaved() {
    this.refresh();
  }
}

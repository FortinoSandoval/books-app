import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BooksController extends Controller {
  @service book;
  model = this.get('model');
  isFiltering = this.get('isFiltering');

  @action
  removeQuery() {
    this.send('queryReset');
  }

  @action
  toggleDeleteModal(book) {
    this.deletingId = book ? book.id : '';
    this.toggleProperty('openModal');
  }

  @action
  deleteConfirm() {
    this.book.delete(this.deletingId).then(() => {
      this.set('model.content', this.model.content.filter(x => x.id !== this.deletingId));
      this.toggleDeleteModal();
    }).catch(err => {
      console.error(err);
    });
  }
}

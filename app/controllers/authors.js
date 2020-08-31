import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AuthorsController extends Controller {
  @service author;
  openModal = false;
  deletingId = '';
  model = this.get('model');

  @action
  toggleDeleteModal(author) {
    this.deletingId = author ? author.id : '';
    this.toggleProperty('openModal');
  }

  @action
  deleteConfirm() {
    this.author.delete(this.deletingId).then(() => {
      this.set('model.content', this.model.content.filter(x => x.id !== this.deletingId));
      this.toggleDeleteModal();
    }).catch(err => {
      console.error(err);
    });
  }
}

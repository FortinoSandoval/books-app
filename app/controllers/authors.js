import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AuthorsController extends Controller {
  @service author;
  openModal = false;
  deletingId = '';
  authorName = '';
  authorBirthdate = '';
  model = this.get('model');
  openAddModal = false;

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

  @action
  addAuthorModal() {
    this.isAdding = true;
    this.toggleAddEditAuthorModal();
  }

  @action
  editAuthorModal(author) {
    this.isAdding = false;
    this.authorName = author.name;
    const date = new Date(author.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

    const year = date.substring(6);
    const month = date.substring(0, 2)
    const day = date.substring(3, 5)

    this.authorBirthdate = `${year}-${month}-${day}`;
    this.editingAuthorId = author.id;
    this.toggleAddEditAuthorModal();
  }

  @action
  toggleAddEditAuthorModal() {
    this.toggleProperty('openAddModal');
  }

  @action
  saveAuthor(e) {
    e.preventDefault();
    const authorDTO = {
      name: this.authorName,
      dateOfBirth: new Date(new Date(this.authorBirthdate).getTime() + 32000000).toISOString()
    };

    if (this.isAdding) {
      return this.author.save(authorDTO).then(() => {
        this.resetAndRefresh();
      });
    }
    return this.author.update(authorDTO, this.editingAuthorId).then(() => {
      this.resetAndRefresh();
    });
  }

  resetAndRefresh() {
    this.set('authorName', '');
    this.set('authorBirthdate', '');
    this.send('authorSaved');
    this.toggleAddEditAuthorModal();
  }
}

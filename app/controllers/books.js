import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BooksController extends Controller {
  @service book;
  @service author;
  bookName = '';
  publishedDate = '';
  model = this.get('model');
  isFiltering = this.get('isFiltering');
  authors = [];
  openAddModal = false;
  selectedAuthor = '';
  editingBookId = '';

  @action
  addBookModal() {
    this.loadAuthors();
    this.isAdding = true;
    this.toggleAddEditBookModal();
  }

  @action
  editBookModal(book) {
    this.isAdding = false;
    this.bookName = book.name;
    const date = new Date(book.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

    const year = date.substring(6);
    const month = date.substring(0, 2)
    const day = date.substring(3, 5)

    this.publishedDate = `${year}-${month}-${day}`;

    this.editingBookId = book.id;
    this.selectedAuthor = book.author.get('id');
    this.toggleAddEditBookModal();
  }

  @action
  saveBook(e) {
    e.preventDefault();
    if (this.selectedAuthor === 'Select an author' || !this.publishedDate || !this.bookName) {
      return;
    }

    const bookDTO = {
      name: this.bookName,
      publishedDate: new Date(new Date(this.publishedDate).getTime() + 32000000).toISOString(),
      authorId: this.selectedAuthor
    };

    if (this.isAdding) {
      return this.book.save(bookDTO).then(() => {
        this.resetAndRefresh();
      });
    }
    return this.book.update(bookDTO, this.editingBookId).then(() => {
      this.resetAndRefresh();
    });
  }

  @action
  authorSelect(authorId) {
    this.selectedAuthor = authorId;
  }

  @action
  toggleAddEditBookModal() {
    this.toggleProperty('openAddModal');
  }

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
    return this.book.delete(this.deletingId).then(() => {
      this.set('model.content', this.model.content.filter(x => x.id !== this.deletingId));
      this.toggleDeleteModal();
    }).catch(err => {
      console.error(err);
    });
  }

  resetAndRefresh() {
    this.set('bookName', '');
    this.set('publishedDate', '');
    this.set('selectedAuthor', '');
    this.set('editingBookId', '');
    this.send('bookSaved');
    this.toggleAddEditBookModal();
  }

  loadAuthors() {
    return this.author.getAuthors().then(({ data }) => {
      this.authors = data;
    });
  }
}

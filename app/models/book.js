import Model, { attr, belongsTo } from '@ember-data/model';

export default class BookModel extends Model {
  @attr name;
  @attr('date') publishedDate;
  @belongsTo('author') author;
}

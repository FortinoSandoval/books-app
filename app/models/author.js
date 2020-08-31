import Model, { attr, hasMany } from '@ember-data/model';

export default class AuthorModel extends Model {
  @attr name;
  @attr('date') dateOfBirth;
  @hasMany('book') books;
}

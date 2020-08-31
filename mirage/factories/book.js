import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  name() {
    return faker.name.title();
  },
  publishedDate() {
    return faker.date.past();
  }
});

import { Factory, trait  } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  name() {
    return `${faker.name.firstName()} ${faker.name.lastName()}`;
  },
  dateOfBirth() {
    return faker.date.between('1900-01-01', '1950-12-31');
  }
});

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @service auth;
  username = '';
  password = '';
  badCredentials = false;

  @action
  login(e) {
    e.preventDefault();
    if (!this.username || !this.password) {
      return;
    }

    const loginDTO = {
      username: this.username,
      password: this.password
    };

    this.auth.add(loginDTO).then(res => {
      console.log(res);
    }).catch(() => {
      this.badCredentials = true;
    });
  }
}

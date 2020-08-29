import Service from '@ember/service';

export default class AuthService extends Service {
  add(loginDTO) {
    return fetch('/api/login', {
      method: 'POST',
      body: loginDTO,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

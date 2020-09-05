import Service from '@ember/service';

export default class AuthService extends Service {
  login(loginDTO) {
    return fetch('/api/login', {
      method: 'POST',
      body: loginDTO,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

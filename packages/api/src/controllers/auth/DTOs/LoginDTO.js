export default class LoginDTO {
  constructor(loggedUser) {
    this.token = loggedUser.token;
  }
}

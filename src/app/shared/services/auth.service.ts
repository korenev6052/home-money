export class AuthService {

  private isAutenticated = false;

  login() {
    this.isAutenticated = true;
  }

  logout() {
    window.localStorage.clear();
    this.isAutenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAutenticated;
  }

}
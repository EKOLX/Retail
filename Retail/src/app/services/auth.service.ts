import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private loggedIn: boolean;

  logIn(): void {
    this.loggedIn = true;
  }

  logOut(): void {
    this.loggedIn = false;
  }

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 1000 * 1);
    });
    return promise;
  }
}

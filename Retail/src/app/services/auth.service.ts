import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private loggedIn: boolean = false;

  logIn(): void {
    // TODO: Store in localStorage
    this.loggedIn = true;
  }

  logOut(): void {
    // TODO: Store in localStorage
    this.loggedIn = false;
  }

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 1000 * 2);
    });
    return promise;
  }
}

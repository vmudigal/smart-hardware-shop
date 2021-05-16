import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { User } from 'src/app/feature/+user/model/user.model';
import { Constants } from 'src/app/shared/constants';

/*
 * Authorisation service
 *
 * @author Vijayendra Mudigal
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private loggedInUser$: Observable<User | null> = this.loggedInUser.asObservable();

  constructor() {

  }

  isAuthenticated(): boolean {
    const sessionUser: string = localStorage.getItem(Constants.LOGGED_IN_USER)!;
    if (sessionUser != null) {
      return true;
    } else {
      return false;
    }
  }

  getLoggedInUser(): Observable<User | null> {
    if (this.isAuthenticated()) {
      if (!this.loggedInUser.value) {
        const sessionUser: string = localStorage.getItem(Constants.LOGGED_IN_USER)!;
        if (sessionUser != null) {
          this.loggedInUser!.next(new User(JSON.parse(sessionUser)));
        }
      }
    }
    return this.loggedInUser$;

  }

  setLoggedInUser(user: User): void {
    this.loggedInUser.next(user);
    localStorage.setItem(Constants.LOGGED_IN_USER, JSON.stringify(user));
  }

  clearLoggedInUser(): void {
    this.loggedInUser.next(null);
    localStorage.removeItem(Constants.LOGGED_IN_USER);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from '../feature/+user/model/user.model';
import { UserService } from '../service/user/user.service';
import { AuthService } from '../service/auth/auth.service';
import { Constants } from '../shared/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  myControl = new FormControl();
  users: User[] = [];
  filteredUsers!: Observable<User[]>;
  selectedUser!: User;

  constructor(private userService: UserService,
    private authService: AuthService,
    private router: Router) {
    
  }

  ngOnInit() {
    if(localStorage.getItem(Constants.LOGGED_IN_USER) != null) {
      console.log('loggedInUser', localStorage.getItem(Constants.LOGGED_IN_USER));
      // this.selectedUser = loggedInUser;
      this.router.navigateByUrl("/");
    } else if (this.selectedUser == null) {
      this.userService.getAllUsers().subscribe((_users) => {
        this.users = _users;
        this.filteredUsers = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.firstName),
            map(firstName => firstName ? this._filter(firstName) : this.users.slice())
          );
        console.log(_users);
      });
    }
  }

  displayFn(user: User): string {
    return user && user.name.firstName ? user.name.firstName : '';
  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.users.filter((user: User) => user.name.firstName.toLowerCase().indexOf(filterValue) === 0);
  }

  onSelectUser(event: any) {
    console.log('event.option.value', event.option.value);
    this.selectedUser = event.option.value;
  }

  login() {
    this.isLoggedIn = true;
    this.authService.setLoggedInUser(this.selectedUser);
    this.router.navigate([''])
  }

}


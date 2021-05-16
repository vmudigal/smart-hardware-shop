import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/feature/+user/model/user.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedInUser!: User | null;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe((loggedInUser) => {
      this.loggedInUser = loggedInUser;
    }, err => {
      this.router.navigate([Constants.NAVIGATE_ERROR, err.status],
        { queryParams: { code: err.status, message: err.statusText } });
    });
  }

  logout() {
    this.authService.clearLoggedInUser();
    window.location.reload();
  }

}

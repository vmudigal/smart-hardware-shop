import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/feature/+user/model/user.model';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedInUser!: User | null;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe((loggedInUser) => {
      this.loggedInUser = loggedInUser;
    });
  }

  logout() {
    this.authService.clearLoggedInUser();
    window.location.reload();
  }

}

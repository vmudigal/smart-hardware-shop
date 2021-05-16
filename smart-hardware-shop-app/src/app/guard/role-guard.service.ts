import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../feature/+user/model/user.model';
import { AuthService } from '../service/auth/auth.service';


@Injectable()
export class RoleGuard implements CanActivate {
  private user!: User;
  constructor(private authService: AuthService,
    private router: Router) {
    this.authService.getLoggedInUser().subscribe(_user => { this.user = _user! });
  }

  canActivate(
    _childRoute: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const expectedRole = _childRoute.data.expectedRole;
    if (this.user && (expectedRole.includes(this.user.role))) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}

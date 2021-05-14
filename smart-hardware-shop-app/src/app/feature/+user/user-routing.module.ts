import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoleGuard } from 'src/app/guard/role-guard.service';
import { Constants } from 'src/app/shared/constants';
import { UserCartComponent } from './cart/user-cart.component';
import { UserDetailComponent } from './profile/user-detail.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'cart', component: UserCartComponent, canActivate: [RoleGuard],
                data: {
                  expectedRole: [Constants.ROLE_CUSTOMER, Constants.ROLE_ADMIN]
                }
            },
            {
                path: 'profile', component: UserDetailComponent, canActivate: [RoleGuard],
                data: {
                  expectedRole: [Constants.ROLE_CUSTOMER, Constants.ROLE_ADMIN]
                }
            }
        ])
    ],
    exports: [RouterModule],
})
export class UserRoutingModule {
}
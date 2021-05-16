import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoleGuard } from 'src/app/guard/role-guard.service';
import { Constants } from 'src/app/shared/constants';
import { UserCartComponent } from './cart/user-cart.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: Constants.ROUTE_USER_CART, 
                component: UserCartComponent, 
                canActivate: [RoleGuard],
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
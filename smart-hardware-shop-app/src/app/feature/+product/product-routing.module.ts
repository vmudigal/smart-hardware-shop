import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoleGuard } from 'src/app/guard/role-guard.service';
import { ProductActionsComponent } from './actions/product-actions.component';
import { Constants } from 'src/app/shared/constants';
import { ProductDetailComponent } from './detail/product-detail.component';
import { ProductRecommendedComponent } from './recommended/product-recommended.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'add', component: ProductActionsComponent, canActivate: [RoleGuard],
                data: {
                    expectedRole: [Constants.ROLE_ADMIN]
                }
            },
            {
                path: ':productId/edit', component: ProductActionsComponent, canActivate: [RoleGuard],
                data: {
                    expectedRole: [Constants.ROLE_ADMIN]
                }
            },
            {
                path: ':productId/delete', component: ProductDetailComponent, canActivate: [RoleGuard],
                data: {
                    expectedRole: [Constants.ROLE_ADMIN]
                }
            }, {
                path: 'recommendeds', component: ProductRecommendedComponent, canActivate: [RoleGuard],
                data: {
                    expectedRole: [Constants.ROLE_CUSTOMER, Constants.ROLE_ADMIN]
                }
            },
        ])
    ],
    exports: [RouterModule],
})
export class ProductRoutingModule {
}
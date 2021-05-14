import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RoleGuard } from './guard/role-guard.service';
import { UserCartComponent } from './feature/+user/cart/user-cart.component';
import { ProductRecommendedComponent } from './feature/+product/recommended/product-recommended.component';
import { ProductCatalogComponent } from './feature/+product/catalog/product-catalog.component';
import { Constants } from './shared/constants';

const appRoutes: Routes = [
  {
    path: '', component: ProductCatalogComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: [Constants.ROLE_CUSTOMER, Constants.ROLE_ADMIN]
    }
  },
  { path: 'product', loadChildren: () => import('./feature/+product/product-routing.module').then(m => m.ProductRoutingModule) },
  { path: 'user', loadChildren: () => import('./feature/+user/user-routing.module').then(m => m.UserRoutingModule) },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

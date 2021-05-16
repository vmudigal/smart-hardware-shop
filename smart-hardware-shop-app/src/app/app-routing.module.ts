import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RoleGuard } from './guard/role-guard.service';
import { ProductCatalogComponent } from './feature/+product/catalog/product-catalog.component';
import { Constants } from './shared/constants';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';

const appRoutes: Routes = [
  {
    path: Constants.ROUTE_HOME, component: ProductCatalogComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: [Constants.ROLE_CUSTOMER, Constants.ROLE_ADMIN]
    }
  },
  {
    path: Constants.ROUTE_PRODUCT,
    loadChildren: () => import('./feature/+product/product-routing.module')
      .then(m => m.ProductRoutingModule)
  },
  {
    path: Constants.ROUTE_USER,
    loadChildren: () => import('./feature/+user/user-routing.module')
      .then(m => m.UserRoutingModule)
  },
  { path: Constants.ROUTE_LOGIN, component: LoginComponent },
  { path: Constants.ROUTE_ERROR, component: ErrorHandlingComponent },
  { path: '**', redirectTo: '/error/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

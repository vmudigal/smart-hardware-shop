import { TestBed } from '@angular/core/testing';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import { ProductCatalogComponent } from './feature/+product/catalog/product-catalog.component';
import { RoleGuard } from './guard/role-guard.service';
import { LoginComponent } from './login/login.component';
import { Constants } from './shared/constants';

export class TestGlobalConstants {
  public static appTestRoutes: Routes = [
    {
      path: '', component: ProductCatalogComponent, canActivate: [RoleGuard],
      data: {
        expectedRole: [Constants.ROLE_CUSTOMER, Constants.ROLE_ADMIN]
      }
    },
    { path: 'product', loadChildren: () => import('./feature/+product/product-routing.module').then(m => m.ProductRoutingModule) },
    { path: 'user', loadChildren: () => import('./feature/+user/user-routing.module').then(m => m.UserRoutingModule) },
    { path: 'login', component: LoginComponent },
    {path: 'error/:errorCode', component: ErrorHandlingComponent},
    {path: '**', redirectTo: '/error/404'}
  ];
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(TestGlobalConstants.appTestRoutes)
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Smart Hardware Shop Application'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Smart Hardware Shop Application');
  });

});

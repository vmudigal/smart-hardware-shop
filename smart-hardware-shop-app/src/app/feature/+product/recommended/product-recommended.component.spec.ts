import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { TestGlobalConstants } from 'src/app/app.component.spec';

import { ProductRecommendedComponent } from './product-recommended.component';

describe('ProductRecommendedComponent', () => {
  let component: ProductRecommendedComponent;
  let fixture: ComponentFixture<ProductRecommendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule,
        RouterTestingModule.withRoutes(TestGlobalConstants.appTestRoutes)],
      declarations: [ProductRecommendedComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRecommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

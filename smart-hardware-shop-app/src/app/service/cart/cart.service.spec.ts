import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { TestGlobalConstants } from 'src/app/app.component.spec';


describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule,
        RouterTestingModule.withRoutes(TestGlobalConstants.appTestRoutes)],
      providers: [CartService]
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return 404 for invalid user 9999', async () => {
    try {
      await service.getUserCart(9999).toPromise();
    } catch (ex) {
      console.log('response', ex);
      expect(ex.status).toEqual(404);
    }
  })

  it('should return 200 for valid user 1', async () => {
    let response = await service.getUserCart(1).toPromise();
    expect(response.id).toEqual(1);
  })
});
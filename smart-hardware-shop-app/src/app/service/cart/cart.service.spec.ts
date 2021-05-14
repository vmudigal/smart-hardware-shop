import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { HttpClientModule } from '@angular/common/http';


describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CartService]
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return 404 for invalid user 999', async () => {
    let response =  await service.getUserCart(999).toPromise();
    console.log('response',response);
    expect(response).toContain(404);
  })
});
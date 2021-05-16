import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Cart, CartProduct } from '../../feature/+user/model/cart.model';
import { modules } from 'src/config/module';
import { environment } from 'src/environments/environment';
import { ProductService } from '../product/product.service';
import { Constants } from '../../shared/constants';
import { User } from 'src/app/feature/+user/model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private productService: ProductService, private router: Router) { }

  getUserCart(userId: number | null): Observable<Cart> {
    return this.http.get<Cart>(environment.baseUrl + modules.cart.detail
      .replace(Constants.USER_ROUTE_PARAM_USER_ID, JSON.stringify(userId))).pipe(
        map((userCart: Cart) => {
          return this.populateCartData(userCart);
        })
      );
  }

  /*
  * Add product to cart
  */
  addToCart(productId: number) {
    let user: User = JSON.parse(localStorage.getItem(Constants.LOGGED_IN_USER)!);
    let added: boolean = false;

    let updatedCart: Cart;

    return this.getUserCart(user.id).pipe(
      map((cart: Cart) => {

        updatedCart = cart;
        // If cart isn't avaiable
        if (updatedCart === undefined) {
          updatedCart = new Cart();
          updatedCart.id = user.id;
          updatedCart.products = [];
          let productToPush: CartProduct = new CartProduct();
          productToPush.id = productId;
          productToPush.quantity = 1;
          updatedCart.products.push(productToPush);
          added = true;

          // Create the cart
          return this.createCart(updatedCart).pipe(map(() => {
            return cart;
          }));
        }
        // If cart is avaiable
        else {
          // If the cart already has the product
          // increment the quantity
          updatedCart.products.some((productFromCart) => {
            if (productFromCart.id == productId) {
              productFromCart.quantity = productFromCart.quantity + 1;
              added = true;
              return;
            }
          });
          // If the cart doesnt have the product
          // add it
          if (!added) {
            let productToPush: CartProduct = new CartProduct();
            productToPush.id = productId;
            productToPush.quantity = 1;
            updatedCart.products.push(productToPush);
            added = true;
          };
          // Finally update the cart
          return this.updateCart(user.id, updatedCart).pipe(map(() => {
            return cart;
          }));
        }
      }));
  }

  /*
   * Remove product from cart
   */
  removeFromCart(productId: number): Observable<Observable<Cart>> {
    let user: User = JSON.parse(localStorage.getItem(Constants.LOGGED_IN_USER)!);

    return this.getUserCart(user.id).pipe(
      map((cart: Cart) => {
        cart.products.splice(cart.products.findIndex(_product => _product.id === productId), 1);
        return this.updateCart(user.id, cart);
      }, () => {
        return null;
      }));
  }

  private populateCartData(cart: Cart): Cart {
    cart.products.forEach(product => {
      this.productService.getProductById(product.id).subscribe((productData) => {
        product.name = productData.name;
        product.price = productData.price;
        product.discount = productData.discount;
      }, err => {
        this.router.navigate([Constants.NAVIGATE_ERROR, err.status], { queryParams: { code: err.status, message: err.statusText } });
      })
    });
    return cart;
  }

  /*
   * Create cart
   */
  private createCart(cart: Cart): Observable<void> {
    return this.http.post<void>(
      environment.baseUrl + modules.cart.list,
      cart
    );
  }

  /*
   * Update cart
   */
  private updateCart(userId: number, cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(environment.baseUrl + modules.cart.detail
      .replace(Constants.USER_ROUTE_PARAM_USER_ID, JSON.stringify(userId)), cart
    );
  }

  clearCart() {
    let user: User = JSON.parse(localStorage.getItem(Constants.LOGGED_IN_USER)!);
    this.http.delete<void>(environment.baseUrl + modules.cart.detail
      .replace(Constants.USER_ROUTE_PARAM_USER_ID, JSON.stringify(user.id))).subscribe((status) => {
        status;
      }, err => {
        this.router.navigate([Constants.NAVIGATE_ERROR, err.status], { queryParams: { code: err.status, message: err.statusText } });
      });
  }
}

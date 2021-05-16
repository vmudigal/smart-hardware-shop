import { Component, OnInit } from '@angular/core';
import { Cart, CartProduct } from 'src/app/feature/+user/model/cart.model';
import { Product } from 'src/app/feature/+product/model/product.model';
import { User } from 'src/app/feature/+user/model/user.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CartService } from 'src/app/service/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {


  loggedInUser!: User | null;
  userCart!: Cart;

  dataSource = new MatTableDataSource<CartProduct>();
  displayedColumns: string[] = ['name', 'unit-price', 'quantity', 'price', 'action'];

  constructor(private authService: AuthService,
    private cartService: CartService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.populateData();
  }

  populateData() {
    this.spinner.show();
    this.authService.getLoggedInUser().subscribe((loggedInUser) => {
      this.loggedInUser = loggedInUser;
      if (!!loggedInUser) {
        this.cartService.getUserCart(loggedInUser.id).subscribe((userCart) => {
          this.userCart = userCart;
          this.dataSource.data = userCart.products;
          this.spinner.hide();
        }, err => {
          this.spinner.hide();
          this.router.navigate([Constants.NAVIGATE_ERROR, err.status],
            { queryParams: { code: err.status, message: err.statusText } });
        });
      }
    }, err => {
      this.spinner.hide();
      this.router.navigate([Constants.NAVIGATE_ERROR, err.status],
        { queryParams: { code: err.status, message: err.statusText } });
    });
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.dataSource.data.map(t => t.price * t.quantity)
      .reduce((acc, value) => acc + value, 0);
  }

  getPrice(product: Product) {
    return product.price * product.quantity;
  }

  clearCart() {
    this.cartService.clearCart();
    // Refresh the data
    this.populateData();
  }

  removeFromCart(product: Product) {

    let productName = product.name;
    this.cartService.removeFromCart(product.id).subscribe((observable) => {
      observable.subscribe((status) => {
        if (status != null) {
          this._snackBar.open(productName, Constants.CART_ACTION_REMOVE, {
            duration: 3000
          });
          // Refresh the data
          this.populateData();
        }
      }, err => {
        this.spinner.hide();
        this.router.navigate([Constants.NAVIGATE_ERROR, err.status], { queryParams: { code: err.status, message: err.statusText } });
      });
    }, err => {
      this.spinner.hide();
      this.router.navigate([Constants.NAVIGATE_ERROR, err.status], { queryParams: { code: err.status, message: err.statusText } });
    });
  }
}

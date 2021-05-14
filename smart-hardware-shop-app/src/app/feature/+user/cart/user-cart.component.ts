import { Component, OnInit } from '@angular/core';
import { Cart, CartProduct } from 'src/app/feature/+user/model/cart.model';
import { Product } from 'src/app/feature/+product/model/product.model';
import { User } from 'src/app/feature/+user/model/user.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CartService } from 'src/app/service/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {


  loggedInUser!: User | null;
  userCart!:Cart;

  dataSource = new MatTableDataSource<CartProduct>();
  displayedColumns: string[] = ['name', 'unit-price', 'quantity', 'price', 'action'];

  constructor(private authService: AuthService, 
    private cartService: CartService,
    private _snackBar: MatSnackBar) {
      
  }

  ngOnInit(): void {
    this.populateData();
  }

  populateData() {
    this.authService.getLoggedInUser().subscribe((loggedInUser) => {
      this.loggedInUser = loggedInUser;
      if (!!loggedInUser) {
        this.cartService.getUserCart(loggedInUser.id).subscribe((userCart) => {
          this.userCart = userCart;
          this.dataSource.data = userCart.products;
        });
      }
    });
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.dataSource.data.map(t => t.price * t.quantity).reduce((acc, value) => acc + value, 0);
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
          this._snackBar.open(productName, 'Removed!', {
            duration: 3000
          });
          // Refresh the data
          this.populateData();
        }
      });
    });
  }
}

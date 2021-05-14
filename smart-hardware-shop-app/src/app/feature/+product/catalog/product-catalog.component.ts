import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Product } from 'src/app/feature/+product/model/product.model';
import { CartService } from 'src/app/service/cart/cart.service';
import { ProductService } from 'src/app/service/product/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth/auth.service';
import { User } from 'src/app/feature/+user/model/user.model';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent implements OnInit {

  products!: Product[];

  resourcesLoaded = false;
  recommendedProducts = false;

  // MatPaginator Inputs
  length = 1000;
  pageSize = 12;
  pageSizeOptions: number[] = [12, 24, 48];

  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent();

  searchText = '';
  loggedInUser!:User | null;

  constructor(private productService: ProductService,
    private authService: AuthService,
    private cartService: CartService,
    private _snackBar: MatSnackBar) {
      this.authService.getLoggedInUser().subscribe((_loggedInUser) => {
        this.loggedInUser = _loggedInUser;
      })
  }

  ngOnInit(): void {
    this.recommendedProducts = false;
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
      // this.allProducts = this.products;
      this.length = this.products.length;

      //
      this.pageEvent.length = this.length;
      this.pageEvent.pageIndex = 0;
      this.pageEvent.pageSize = 12;
      this.resourcesLoaded = true;
    });
  }

  public doFilter = (target: any) => {
    this.resourcesLoaded = false;
    this.productService.searchProducts(target.value.trim().toLocaleLowerCase()).subscribe((searchedProducts) => {
      this.products = searchedProducts;
      //
      this.pageEvent.length = this.products.length;
      this.pageEvent.pageIndex = 0;

      this.length = this.products.length;
      this.resourcesLoaded = true;
    })
  }

  add(product: Product) {
    console.log('Add Product: ', product);
    this.cartService.addToCart(product.id).subscribe((observable) => {
      observable.subscribe((status) => {
        if (status != null) {
          this._snackBar.open(product.name, 'Added', {
            duration: 3000
          });
        } else {
          this._snackBar.open('Try again!', 'Error', {
            duration: 3000
          });
        }
      })
    });
  }

  getRecommendedProducts() {
    this.recommendedProducts = true;
    this.productService.getRecommendedProducts().subscribe((recommendedProducts) => {
      this.products = recommendedProducts;
    })
  }
  isLoggedInUserAdmin() {
  return this.loggedInUser != null && this.loggedInUser.role == Constants.ROLE_ADMIN;
  }

  deleteProduct(product:Product) {
    let productName = product.name;
    this.productService.deleteProduct(product.id).subscribe((deleted) => {
      if(deleted) {
        window.location.reload();
        this._snackBar.open(productName, 'Deleted', {
          duration: 3000
        });
      } else {
        this._snackBar.open(productName, 'Error, Try again!', {
          duration: 3000
        });
      }
    });
  }

}



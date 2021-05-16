import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Product } from 'src/app/feature/+product/model/product.model';
import { CartService } from 'src/app/service/cart/cart.service';
import { ProductService } from 'src/app/service/product/product.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { User } from 'src/app/feature/+user/model/user.model';
import { Constants } from 'src/app/shared/constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

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
  loggedInUser!: User | null;

  constructor(private productService: ProductService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private spinner: NgxSpinnerService) {
    this.authService.getLoggedInUser().subscribe((_loggedInUser) => {
      this.loggedInUser = _loggedInUser;
    }, err => {
      this.router.navigate([Constants.NAVIGATE_ERROR, err.status],
        { queryParams: { code: err.status, message: err.statusText } });
    })
  }

  ngOnInit(): void {

    this.spinner.show();
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
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.router.navigate([Constants.NAVIGATE_ERROR, err.status],
        { queryParams: { code: err.status, message: err.statusText } });
    });
  }

  public doFilter = (target: any) => {
    this.resourcesLoaded = false;
    this.productService.searchProducts(target.value.trim()
      .toLocaleLowerCase()).subscribe((searchedProducts) => {
        this.products = searchedProducts;
        //
        this.pageEvent.length = this.products.length;
        this.pageEvent.pageIndex = 0;

        this.length = this.products.length;
        this.resourcesLoaded = true;
      }, err => {
        this.router.navigate([Constants.NAVIGATE_ERROR, err.status],
          { queryParams: { code: err.status, message: err.statusText } });
      })
  }

  add(product: Product) {
    this.productService.add(product, this.cartService);
  }

  isLoggedInUserAdmin() {
    return this.loggedInUser != null && this.loggedInUser.role == Constants.ROLE_ADMIN;
  }

  delete(product: Product) {
    this.productService.delete(product);
  }

}



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/app/feature/+product/model/product.model';
import { CartService } from 'src/app/service/cart/cart.service';
import { ProductService } from 'src/app/service/product/product.service';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-product-recommended',
  templateUrl: './product-recommended.component.html',
  styleUrls: ['./product-recommended.component.scss']
})
export class ProductRecommendedComponent implements OnInit {

  products!: Product[];
  resourcesLoaded = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.productService.getRecommendedProducts().subscribe((recommendedProducts) => {
      this.products = recommendedProducts;
      this.resourcesLoaded = true;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.router.navigate([Constants.NAVIGATE_ERROR, err.status],
        { queryParams: { code: err.status, message: err.statusText } });
    })
  }

  add(data: Product) {
    this.productService.add(data, this.cartService);
  }

}

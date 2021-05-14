import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/feature/+product/model/product.model';
import { CartService } from 'src/app/service/cart/cart.service';
import { ProductService } from 'src/app/service/product/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-recommended',
  templateUrl: './product-recommended.component.html',
  styleUrls: ['./product-recommended.component.scss']
})
export class ProductRecommendedComponent implements OnInit {

  products!:Product[];
  resourcesLoaded = false;

  constructor(private productService:ProductService,private cartService: CartService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.productService.getRecommendedProducts().subscribe((recommendedProducts) => {
      this.products = recommendedProducts;
      this.resourcesLoaded = true;
    })
  }

  add(product: Product) {
    console.log('Add Product: ', product);
    let added = this.cartService.addToCart(product.id);
    if (true) {
      this._snackBar.open(product.name, 'Added', {
        duration: 3000
      });
    } else {
      this._snackBar.open('Try again!', 'Error', {
        duration: 3000
      });
    }
  }

}

import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { Product } from '../../feature/+product/model/product.model';
import { modules } from 'src/config/module';
import { CartService } from '../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Constants } from 'src/app/shared/constants';

/*
 * Product service interacts with 
 * backend product API's
 *
 * @author Vijayendra Mudigal
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  /*
   * Get all products
   */
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl + modules.product.list).pipe(
      map(products => products.map(product => new Product(product)))
    );
  }

  /*
   * Get all products considering pagination
   */
  getAllProductsByPagination(pageNumber: number, NoOfEntries: number): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl + modules.product.paginatedList
      .replace(Constants.PRODUCT_QUERY_PARAM_PAGE_NUMBER, JSON.stringify(pageNumber))
      .replace(Constants.PRODUCT_QUERY_PARAM_NUMBER_OF_ENTRIES, JSON.stringify(NoOfEntries))).pipe(
        map(products => products.map(product => new Product(product)))
      );
  }

  /*
   * Search products based on keyword
   */
  searchProducts(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl + modules.product.search
      .replace(Constants.PRODUCT_ROUTE_PARAM_KEYWORD, keyword)).pipe(
        map(products => products.map(product => new Product(product)))
      );
  }

  /*
   * Get a product by product id
   */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(environment.baseUrl + modules.product.detail
      .replace(Constants.PRODUCT_ROUTE_PARAM_PRODUCT_ID, JSON.stringify(id))).pipe(
        map(product => new Product(product))
      );
  }

  /*
   * Get recommended products
   */
  getRecommendedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl + modules.product.recommendeds).pipe(
      map(products => products.map(product => new Product(product)))
    );
  }

  /*
   * Add product
   */
  addProduct(product: Product): Observable<void> {
    return this.http.post<void>(
      environment.baseUrl + modules.product.list,
      product
    );
  }

  /*
   * Edit product
   */
  editProduct(productId: number, product: Product): Observable<void> {
    return this.http.put<void>(environment.baseUrl + modules.product.detail
      .replace(Constants.PRODUCT_ROUTE_PARAM_PRODUCT_ID, JSON.stringify(productId)), product);
  }

  /*
   * Delete product
   */
  deleteProduct(productId: number): Observable<boolean> {
    return this.http.delete<boolean>(environment.baseUrl + modules.product.detail
      .replace(Constants.PRODUCT_ROUTE_PARAM_PRODUCT_ID, JSON.stringify(productId)));
  }

  // shared code

  add(product: Product, cartService: CartService) {
    cartService.addToCart(product.id).subscribe((observable) => {
      observable.subscribe((status) => {
        if (status != null) {
          this._snackBar.open(product.name, Constants.CART_ACTION_ADD, {
            duration: 3000
          });
        } else {
          this._snackBar.open(product.name, Constants.PRODUCT_ACTION_ERROR, {
            duration: 3000
          });
        }
      }, err => {
        this.router.navigate([Constants.NAVIGATE_ERROR, err.status], { queryParams: { code: err.status, message: err.statusText } });
      })
    }, err => {
      this.router.navigate([Constants.NAVIGATE_ERROR, err.status], { queryParams: { code: err.status, message: err.statusText } });
    });
  }

  delete(product: Product) {
    let productName = product.name;
    this.deleteProduct(product.id).subscribe((deleted) => {
      if (deleted) {
        window.location.reload();
        this._snackBar.open(productName, Constants.PRODUCT_ACTION_DELETE, {
          duration: 3000
        });
      } else {
        this._snackBar.open(productName, Constants.PRODUCT_ACTION_ERROR, {
          duration: 3000
        });
      }
    }, err => {
      this.router.navigate([Constants.NAVIGATE_ERROR, err.status], { queryParams: { code: err.status, message: err.statusText } });
    });
  }
}

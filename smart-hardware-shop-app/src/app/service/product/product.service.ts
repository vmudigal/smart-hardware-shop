import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { Product } from '../../feature/+product/model/product.model';
import { modules } from 'src/config/module';

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

  constructor(private http: HttpClient) { }

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
  getAllProductsByPagination(pageNumber:number, NoOfEntries:number): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl + modules.product.paginatedList
      .replace('${page_number}', JSON.stringify(pageNumber))
      .replace('${number_of_entries}', JSON.stringify(NoOfEntries))).pipe(
      map(products => products.map(product => new Product(product)))
    );
  }

  /*
   * Search products based on keyword
   */
  searchProducts(keyword:string):Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl + modules.product.search
      .replace('${keyword}', keyword)).pipe(
      map(products => products.map(product => new Product(product)))
    );
  }

  /*
   * Get a product by product id
   */
  getProductById(id:number): Observable<Product> {
    return this.http.get<Product>(environment.baseUrl + modules.product.detail
      .replace('${product_id}', JSON.stringify(id))).pipe(
      map(product => new Product(product))
    );
  }

  /*
   * Get recommended products
   */
  getRecommendedProducts():Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl + modules.product.recommended).pipe(
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
  editProduct(productId:number, product: Product): Observable<void> {
    return this.http.put<void>(environment.baseUrl + modules.product.detail
      .replace('${product_id}', JSON.stringify(productId)), product);
  }

  /*
   * Delete product
   */
  deleteProduct(productId: number): Observable<boolean> {
    return this.http.delete<boolean>(environment.baseUrl + modules.product.detail
      .replace('${product_id}', JSON.stringify(productId)));
  }
}

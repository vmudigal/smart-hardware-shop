import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CartService } from 'src/app/service/cart/cart.service';
import { ProductService } from 'src/app/service/product/product.service';
import { Constants } from 'src/app/shared/constants';
import { User } from '../../+user/model/user.model';
import { Product } from '../model/product.model';

export class ProductImage {
  small!: string;
  medium!: string;
  big!: string;
  constructor(image: string) {
    this.small = image;
    this.medium = image;
    this.big = image;
  }
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  id!: number;
  product!: Product;

  // ngx-gallery options
  galleryOptions!: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];

  loggedInUser!: User | null;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
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
    this.id = +this.route.snapshot.params['productId'];
    // !Number.isNaN(this.id) return 404
    this.productService.getProductById(this.id).subscribe((_product) => {
      this.product = _product;
      if (!!this.product.images) {
        this.product.images.forEach((image) => {
          let galleryImage = new NgxGalleryImage(new ProductImage(image));
          this.galleryImages.push(galleryImage);
        });
      } else if (!!this.product.defaultImage) {
        let galleryImage = new NgxGalleryImage(new ProductImage(this.product.defaultImage));
        this.galleryImages.push(galleryImage);
      }
    }, err => {
      this.spinner.hide();
      this.router.navigate([Constants.NAVIGATE_ERROR, err.status],
        { queryParams: { code: err.status, message: err.statusText } });
    }, () => {
      this.spinner.hide();
    });

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
  }

  isLoggedInUserAdmin() {
    return this.loggedInUser != null
      && this.loggedInUser.role == Constants.ROLE_ADMIN;
  }

  add(product: Product) {
    this.productService.add(product, this.cartService);
  }

  delete(product: Product) {
    this.productService.delete(product);
  }

}
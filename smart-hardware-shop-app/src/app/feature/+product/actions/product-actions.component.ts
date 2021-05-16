import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ProductService } from 'src/app/service/product/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-product-actions',
  templateUrl: './product-actions.component.html',
  styleUrls: ['./product-actions.component.scss']
})
export class ProductActionsComponent implements OnInit {

  form!: FormGroup;
  id!: number;
  isAddMode: boolean = true;
  submitted = false;

  PRICE_VALIDATOR: string = '^[1-9][0-9]*(\.[0-9]?[0-9]?)?';
  DISCOUNT_VALIDATOR: string = '^[0-9]*(\.[0-9]?[0-9]?)?';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private productService: ProductService,
    private _snackBar: MatSnackBar
  ) { }


  ngOnInit() {
    this.id = +this.route.snapshot.params['productId']!;
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.maxLength(250), Validators.required]],
      description: ['', [Validators.maxLength(2500), Validators.required]],
      price: [, [Validators.required, Validators.pattern(this.PRICE_VALIDATOR)]],
      discount: [0, [Validators.required, Validators.pattern(this.DISCOUNT_VALIDATOR)]],
      defaultImage: ['']
    });

    if (!this.isAddMode) {

      this.spinner.show();
      this.productService.getProductById(this.id).subscribe((product) => {
        this.form = this.formBuilder.group({
          id: [product.id],
          name: [product.name, [Validators.maxLength(250), Validators.required]],
          description: [product.description, [Validators.maxLength(2500), Validators.required]],
          price: [product.price, [Validators.required, Validators.pattern(this.PRICE_VALIDATOR)]],
          discount: [product.discount, [Validators.required, Validators.pattern(this.DISCOUNT_VALIDATOR)]],
          defaultImage: [product.defaultImage]
        });
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
        this.router.navigate([Constants.NAVIGATE_ERROR, err.status],
          { queryParams: { code: err.status, message: err.statusText } });
      });
    }
  }

  // convenience getter for easy 
  // access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.spinner.show();
    if (this.isAddMode) {
      this.createProduct();
    } else {
      this.updateProduct();
    }
  }

  private createProduct() {
    this.productService.addProduct(this.form.value)
      .pipe(first())
      .subscribe((data: any) => {
        this._snackBar.open(data.name, Constants.PRODUCT_ACTION_CREATE, {
          duration: 3000
        });
        this.router.navigate([Constants.NAVIGATE_PRODUCT, data.id]);
      }, err => {
        this.spinner.hide();
        this.router.navigate([Constants.NAVIGATE_ERROR, err.status],
          { queryParams: { code: err.status, message: err.statusText } });
      })
      .add(() => this.spinner.hide());
  }

  private updateProduct() {
    this.productService.editProduct(this.id, this.form.value)
      .pipe(first())
      .subscribe((data: any) => {
        this._snackBar.open(data.name, Constants.PRODUCT_ACTION_UPDATE, {
          duration: 3000
        });
        this.router.navigate([Constants.NAVIGATE_PRODUCT, data.id]);
      }, err => {
        this.spinner.hide();
        this.router.navigate([Constants.NAVIGATE_ERROR, err.status],
          { queryParams: { code: err.status, message: err.statusText } });
      })
      .add(() => this.spinner.hide());
  }
}

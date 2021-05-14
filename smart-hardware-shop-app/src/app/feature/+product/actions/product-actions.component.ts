import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ProductService } from 'src/app/service/product/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-actions',
  templateUrl: './product-actions.component.html',
  styleUrls: ['./product-actions.component.scss']
})
export class ProductActionsComponent implements OnInit {

  form!: FormGroup;
  id!: number;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private _snackBar: MatSnackBar
  ) { }


  ngOnInit() {
    this.id = +this.route.snapshot.params['productId'];
    console.log('this.id: ',this.id);
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.maxLength(250), Validators.required]],
      description: ['', [Validators.maxLength(2500), Validators.required]],
      price: [, [Validators.required, Validators.pattern('^[0-9]*$')]],
      discount: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
      defaultImage: ['']
    });

    if(!this.isAddMode) {
      this.productService.getProductById(this.id).subscribe((product) => {
        this.form = this.formBuilder.group({
          id: [product.id],
          name: [product.name, [Validators.maxLength(250), Validators.required]],
          description: [product.description, [Validators.maxLength(2500), Validators.required]],
          price: [product.price, [Validators.required, Validators.pattern('^[0-9]*$')]],
          discount: [product.discount, [Validators.required, Validators.pattern('^[0-9]*$')]],
          defaultImage: [product.defaultImage]
        });
      });
    }
  }

  // convenience getter for easy 
  // access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createProduct();
    } else {
      this.updateProduct();
    }
  }

  private createProduct() {
    this.productService.addProduct(this.form.value)
      .pipe(first())
      .subscribe(() => {
        this._snackBar.open(this.form.value.name, 'Product Created!', {
          duration: 3000
        });
        this.router.navigate(['/']);
      })
      .add(() => this.loading = false);
  }

  private updateProduct() {
    this.productService.editProduct(this.id, this.form.value)
        .pipe(first())
        .subscribe(() => {
          this._snackBar.open(this.form.value.name, 'Product Updated!', {
            duration: 3000
          });
          this.router.navigate(['../'], { relativeTo: this.route });
        })
        .add(() => this.loading = false);
  }
}

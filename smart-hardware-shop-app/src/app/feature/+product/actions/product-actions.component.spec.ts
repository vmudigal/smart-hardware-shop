import { HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TestGlobalConstants } from 'src/app/app.component.spec';

import { ProductActionsComponent } from './product-actions.component';

describe('ProductActionsComponent', () => {
  let component: ProductActionsComponent;
  let fixture: ComponentFixture<ProductActionsComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule, MatSnackBarModule, 
        RouterTestingModule.withRoutes(TestGlobalConstants.appTestRoutes)],
      declarations: [ ProductActionsComponent ],
      providers: [{ provide: ActivatedRoute, useValue: {
        params: of({ id: 1001 }),
        snapshot: {
            params: {
              productId: 1001
            }
          },
      }
    }, { provide: FormBuilder, useValue: formBuilder }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductActionsComponent);
    component = fixture.componentInstance;
    component.form = formBuilder.group({
      id: [''],
      name: ['', [Validators.maxLength(250), Validators.required]],
      description: ['', [Validators.maxLength(2500), Validators.required]],
      price: [, [Validators.required, Validators.pattern('^[0-9]*$')]],
      discount: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
      defaultImage: ['']});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

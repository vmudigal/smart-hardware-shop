import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { ProductCatalogComponent } from "./catalog/product-catalog.component";
import { ProductDetailComponent } from "./detail/product-detail.component";
import { ProductRecommendedComponent } from "./recommended/product-recommended.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSortModule } from "@angular/material/sort";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ProductRoutingModule } from "./product-routing.module";
import { ProductActionsComponent } from "./actions/product-actions.component";
import { NgxGalleryModule } from "@kolkov/ngx-gallery";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        ProductRoutingModule,

        // Material Module
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        MatCardModule,
        MatAutocompleteModule,
        MatTableModule,
        MatSnackBarModule,
        FlexLayoutModule,
        NgxGalleryModule
    ],
    declarations: [
        ProductDetailComponent,
        ProductRecommendedComponent,
        ProductCatalogComponent,
        ProductActionsComponent
    ]
})
export class ProductModule { }
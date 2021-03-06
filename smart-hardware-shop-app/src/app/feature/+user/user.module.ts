import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { UserCartComponent } from "./cart/user-cart.component";
import { UserRoutingModule } from "./user-routing.module";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        UserRoutingModule,

        // Material Module
        MatTableModule,
        MatButtonModule,
    ],
    declarations: [
        UserCartComponent
    ]
})
export class UserModule { }
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from '../components/product/product.component';
import { ProductDetailComponent } from '../components/product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { EditModalComponent } from './modals/edit/edit-modal.component';
import { CreateModalComponent } from './modals/create/create-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CreateProductComponent } from '../components/create-product-component/create-product.component';

@NgModule({
  declarations: [
    AppComponent, ProductComponent, ProductDetailComponent, ProductListComponent,
    CreateProductComponent, EditModalComponent, CreateModalComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

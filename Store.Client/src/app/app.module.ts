import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from '../components/product/product.component';
import { ProductDetailComponent } from '../components/product-detail/product-detail.component';
import { ProductListComponent } from '../components/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent, ProductComponent, ProductDetailComponent, ProductListComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

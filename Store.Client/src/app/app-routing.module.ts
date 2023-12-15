import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from '../components/product/product.component';
import { ProductDetailComponent } from '../components/product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'products/:mainId/:altId', component: ProductDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

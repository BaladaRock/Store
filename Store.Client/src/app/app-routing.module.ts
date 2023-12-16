import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from '../components/product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CreateProductComponent } from '../components/create-product-component/create-product.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'products/:mainId/:altId', component: ProductDetailComponent },
  { path: 'create-product', component: CreateProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

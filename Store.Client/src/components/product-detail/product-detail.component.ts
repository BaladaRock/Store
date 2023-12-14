// product-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductComponent } from '../product/product.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  mainId: string | null = null;
  altId: string | null = null;
  product: ProductComponent | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.mainId = params['mainId'];
      this.altId = params['altId'];
      this.loadProduct();
    });
  }

  loadProduct() {
    const productObserver = {
      next: (result: ProductComponent | null) => {
        this.product = result;
      },
      error: (error: any) => {
        console.error(error);
      }
    };
  
    this.subscription = this.productService.getProduct(this.mainId, this.altId)
        .subscribe(productObserver);
  }
  
  private subscription: Subscription = new Subscription();
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

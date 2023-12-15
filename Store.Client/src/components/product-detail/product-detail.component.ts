
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../app/models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  mainId: string | null = null;
  altId: string | null = null;
  productDetails: Product | null = null;
  imageUrl: string | null = null;

  private subscription: Subscription = new Subscription();

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
      next: (result: Product | null) => {
        this.productDetails = result;
        this.imageUrl = this.productService.getImagePath(this.productDetails) || null;
        console.log(this.productDetails);
      },
      error: (error: any) => {
        console.error(error);
      }
    };
  
    this.subscription = this.productService.getProduct(this.mainId, this.altId)
        .subscribe(productObserver);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


import { Component, Input } from '@angular/core';
import { Product } from '../../app/models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.css']
})
export class ProductComponent {
  @Input() product: Product | null = null;
  public imageUrl: string | null = null;
  constructor(private productService: ProductService){}

  getImagePath(): string | null {
    return this.productService.getImagePath(this.product); 
  }
}

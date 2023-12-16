import { Component, Input, Output } from '@angular/core';
import { Product } from '../../app/models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.css']
})
export class ProductComponent {
  
  @Input() product: Product | null = null;
  constructor(private productService: ProductService){}

  getImagePath(): string | null {
    return this.productService.getImagePath(this.product); 
  }

  deleteProduct() {
    if (this.product) {
      this.productService.deleteProduct(this.product).subscribe({
        next: () => {
          // Used this so the UI would reflect the deletion
          location.reload(); 
        },
        error: (error) => {
          console.error('Error deleting product:', error);
        }
      });
    }
  }

}
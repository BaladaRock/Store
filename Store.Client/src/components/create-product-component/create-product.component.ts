import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {

  productMainId: string = '';
  productAltId: string = '';
  productName: string | null = null;
  productPrice: number | null = null;
  productQuantity: number | null = null;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  createProdcut() {
    const newProduct = {
      idxCode: this.productMainId,
      idxCodeAlt: this.productAltId,
      name: this.productName,
      price: this.productPrice,
      quantity: this.productQuantity,
      date: ''
    }

    this.productService.createProduct(newProduct).subscribe(() => {
      this.router.navigate(['/'])
    });

  }
}

import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';

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

  message: string | null = null;
  isError: boolean = false;
  successfullCreation: boolean = false;

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

    this.productService.createProduct(newProduct).pipe(
      tap({
        next: () => {
          this.message = 'A new product has been created!';
          this.successfullCreation = true;
          this.isError = false;
    
          setTimeout(() => this.router.navigate(['/']), 2000);
        },
        error: () => {
          this.message = 'Please check your fields!' +
            ' Make sure there is no other product with the same IdxCode and IdxCodeAlt!';
          this.isError = true;
        }
      })
    ).subscribe();
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}

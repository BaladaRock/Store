import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../../app/models/product';
import { ProductService } from '../../services/product.service';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public products: Product[] | null = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProductByIds()
      .pipe(
        catchError((error) => {
          console.error(error);
          throw error;
        })
      )
      .subscribe((result) => {
        this.products = result;
      });
  }

  redirectToCreateProduct() {
    this.router.navigate(['/create-product']);
  }
}
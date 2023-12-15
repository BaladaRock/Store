
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ProductListComponent } from '../app/product-list/product-list.component';
import { Product } from '../app/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://localhost:7098/products';
  public imageUrl: string | null = null;

  constructor(private http: HttpClient) { }

  getProductByIds(): Observable<ProductListComponent | null> {
    const url = `${this.apiUrl}`;
    var count = this.http.get<ProductListComponent | null>(url);
    return this.http.get<ProductListComponent | null>(url);
  }

  getProduct(mainId: string | null, altId: string | null): Observable<Product | null> {
    const url = `${this.apiUrl}/${mainId}/${altId}`;
    return this.http.get<Product | null>(url).pipe(
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }

  getImagePath(product: Product | null): string | null {
    const coreFileName = "image_";
    var randomImageNumber = Math.floor((Math.random() * 9 + 1));
    this.imageUrl = product ? `assets/images/${coreFileName}${randomImageNumber}.jpg` : null;

    return this.imageUrl;
  }

  updateProduct(mainId: string, altId: string, updatedProduct: Product): Observable<Product | null> {
    const url = `${this.apiUrl}/${mainId}/${altId}`;
    return this.http.put<Product | null>(url, updatedProduct).pipe(
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );

    // Add here more methods to interact with the API
  }

}

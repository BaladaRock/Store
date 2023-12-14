
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import {ProductComponent} from '../components/product/product.component'
import { ProductDetailComponent } from '../components/product-detail/product-detail.component';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://localhost:7098/products';

  constructor(private http: HttpClient) {}

  getProductByIds(): Observable<ProductComponent | null> {
    const url = `${this.apiUrl}`;
    return this.http.get<ProductComponent | null>(url);
  }

  getProduct(mainId: string | null, altId: string | null): Observable<ProductComponent | null> {
    const url = `${this.apiUrl}/${mainId}/${altId}`;
    return this.http.get<ProductComponent | null>(url).pipe(
      catchError((error: any) => {
        console.error(error);
        throw error; // relansează eroarea pentru a fi tratată ulterior
      })
    );
  }

  // Alte metode pentru interacțiunea cu API-ul legat de produse pot fi adăugate aici
}

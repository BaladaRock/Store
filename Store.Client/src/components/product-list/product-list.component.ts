import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Product {
  idxCode: string;
  idxCodeAlt: string;
  name: string | null;
  date: string | null;
  quantity: number | null;
  price: number | null;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public products: Product[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.http.get<Product[]>('/products').subscribe(
      (result) => {
        this.products = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
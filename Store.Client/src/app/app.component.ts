import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Product {
  idxCode: string;
  idxCodeAlt: string;
  name: string | null;
  date: string | null;
  quantity: number | null;
  price: number | null;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'store.client';
}

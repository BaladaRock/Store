import { Component, Input } from '@angular/core';

interface Product {
  idxCode: string;
  idxCodeAlt: string;
  name: string | null;
  date: string | null;
  quantity: number | null;
  price: number | null;
}

@Component({
  selector: 'app-product',
  templateUrl: 'product.html',
  styleUrls: ['product.css']
})
export class ProductComponent {
  @Input() product: Product | null = null;

  getImagePath(): string | null {
    const coreFileName = "image_";
    var randomImageNumber = Math.floor((Math.random() * 9 + 1));
    return this.product ? `assets/images/${coreFileName}${randomImageNumber}.jpg` : null;
  }
}

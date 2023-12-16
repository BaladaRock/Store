import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../app/models/product';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  mainId: string | null = null;
  altId: string | null = null;
  productDetails: Product | null = null;
  isEditModalOpen = false;
  editName: string | null = null;
  editPrice: number | null = null;
  editQuantity: number | null = null;
  editDate: string | null = null;

  private subscription: Subscription = new Subscription();
  @Input() public imageUrl: string | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

openEditModal() {
  this.isEditModalOpen = true;
  this.editName = this.productDetails?.name || '';
  this.editPrice = this.productDetails?.price || null;
  this.editQuantity = this.productDetails?.quantity || null;
  this.editDate = this.productDetails?.date || '';
}

saveChanges() {
  this.productService.updateProduct(
    this.mainId || '',
    this.altId || '',
    {
      name: this.editName || '',
      price: this.editPrice || null,
      quantity: this.editQuantity || null,
      date: this.editDate || '',
      idxCode: '',
      idxCodeAlt: ''
    }
  ).subscribe((updatedProduct) => {
    this.productDetails = updatedProduct;
    this.isEditModalOpen = false;
  });
}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.mainId = params['mainId'];
      this.altId = params['altId'];
      this.loadProduct();
    });
  }

  loadProduct() {
    const productObserver = {
      next: (result: Product | null) => {
        this.productDetails = result;
        this.imageUrl = this.productService.getImagePath(this.productDetails) || null;
      },
      error: (error: any) => {
        console.error(error);
      }
    };

    this.subscription = this.productService.getProduct(this.mainId, this.altId)
      .subscribe(productObserver);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
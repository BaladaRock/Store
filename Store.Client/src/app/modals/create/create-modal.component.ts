import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-create-modal',
    template: `
    <div class="create-modal">
      <label>IdxCode:</label>
      <input [(ngModel)]="productMainId" />
      <label>IdxCodeAlt:</label>
      <input [(ngModel)]="productAltId" />
      <label>Name:</label>
      <input [(ngModel)]="productName" />
      <label>Price:</label>
      <input [(ngModel)]="productPrice" />
      <label>Quantity:</label>
      <input [(ngModel)]="productQuantity" />

      <button (click)="createProdcut()">OK</button>
    </div>
  `,
    styleUrls: ['./create-modal.component.css']
})
export class CreateModalComponent {
    @Input() productMainId: string = '';
    @Input() productAltId: string = '';
    @Input() productName: string | null = null;
    @Input() productPrice: number | null = null;
    @Input() productQuantity: number | null = null;

    @Output() createProductEvent = new EventEmitter<void>();

    createProdcut() {
        this.createProductEvent.emit();
    }
}
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductDetailComponent } from '../../components/product-detail/product-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-modal',
  template: `
    <div class="edit-modal">
      <!-- Formularul de editare -->
      <label>Name:</label>
      <input [(ngModel)]="name" />
      <label>Price:</label>
      <input [(ngModel)]="quantity" />
      <label>Quantity:</label>
      <input [(ngModel)]="editQuantity" />
      <label>Date:</label>
      <input [(ngModel)]="editDate" />

      <!-- Buton pentru salvarea modificărilor -->
      <button (click)="saveChanges()">OK</button>
    </div>
  `,
  styles: [`
    .edit-modal {
      /* Stiluri pentru modal */
      /* Poți adapta stilurile după preferințele tale */
    }
  `]
})
export class EditModalComponent {
  @Input() editName: string | null = null;
  @Input() editPrice: number | null = null;
  @Input() editQuantity: number | null = null;
  @Input() editDate: string | null = null;

  // Eveniment pentru a notifica salvarea modificărilor
  @Output() saveChangesEvent = new EventEmitter<void>();

  // Metoda pentru salvarea modificărilor și emiterea evenimentului
  saveChanges() {
    this.saveChangesEvent.emit();
  }
}
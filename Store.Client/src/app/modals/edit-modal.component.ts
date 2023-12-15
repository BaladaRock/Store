import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-modal',
  template: `
    <div class="edit-modal">
      <label>Name:</label>
      <input [(ngModel)]="editName" />
      <label>Price:</label>
      <input [(ngModel)]="editQuantity" />
      <label>Quantity:</label>
      <input [(ngModel)]="editQuantity" />
      <label>Date:</label>
      <input [(ngModel)]="editDate" />

      <button (click)="saveChanges()">OK</button>
    </div>
  `
})
export class EditModalComponent {
  @Input() editName: string | null = null;
  @Input() editPrice: number | null = null;
  @Input() editQuantity: number | null = null;
  @Input() editDate: string | null = null;

  @Output() saveChangesEvent = new EventEmitter<void>();

  saveChanges() {
    this.saveChangesEvent.emit();
  }
}
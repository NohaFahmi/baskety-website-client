import {Component, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import {IListItem} from "../../interfaces/item.interface";
import {InputNumberModule} from "primeng/inputnumber";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-shopping-list-item-card',
  standalone: true,
  imports: [
    InputNumberModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CurrencyPipe
  ],
  templateUrl: './shopping-list-item-card.component.html',
  styleUrl: './shopping-list-item-card.component.scss'
})
export class ShoppingListItemCardComponent {
  @Input() listItem?: IListItem;
  @Output() updateListItem = new EventEmitter<IListItem>();
  @Output() deleteListItem = new EventEmitter<number>();


  onQuantityChange(listItem: IListItem) {
    if(listItem.qty > 0) {
      this.updateListItem.emit(listItem);
    }
  }

  onDeleteItem(listItem: IListItem) {
    this.deleteListItem.emit(listItem.id);
  }
}

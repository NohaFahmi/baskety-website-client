import {Component, inject, Input} from '@angular/core';
import {IListItem} from "../../interfaces/item.interface";
import {InputNumberModule} from "primeng/inputnumber";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-shopping-list-item-card',
  standalone: true,
  imports: [
    InputNumberModule,
    ButtonModule
  ],
  templateUrl: './shopping-list-item-card.component.html',
  styleUrl: './shopping-list-item-card.component.scss'
})
export class ShoppingListItemCardComponent {
  @Input() listItem?: IListItem;
}

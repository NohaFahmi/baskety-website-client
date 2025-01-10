import {Component, computed, inject, Input, signal} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {NgOptimizedImage} from "@angular/common";
import {IItem, IListItem, INewItem} from "../../interfaces/item.interface";
import {AuthService} from "../../../core/services/auth/auth.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {from, of} from "rxjs";
import {ListService} from "../../../core/services/list/list.service";
import {ShoppingListStatus} from "../../interfaces/list.interface";
import {ShoppingListService} from "../../services/shopping-list/shopping-list.service";

@Component({
  selector: 'app-home-item-card',
  standalone: true,
  imports: [
    ButtonModule,
    NgOptimizedImage
  ],
  templateUrl: './home-item-card.component.html',
  styleUrl: './home-item-card.component.scss'
})
export class HomeItemCardComponent {
  @Input() item?: IItem;
  private shoppingListService = inject(ShoppingListService);

  addItemToList(item: IItem) {
    this.shoppingListService.addItemToShoppingList(item);
  }

}

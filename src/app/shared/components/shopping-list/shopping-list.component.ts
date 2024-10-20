import {Component, effect, inject} from '@angular/core';
import {ShoppingListItemCardComponent} from "../shopping-list-item-card/shopping-list-item-card.component";
import {ListService} from "../../../core/services/list/list.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {from} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [
    ShoppingListItemCardComponent
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss'
})
export class ShoppingListComponent {
  private shoppingListService = inject(ListService);
  currentList = toSignal(from(this.shoppingListService.getCurrentOpenList()));

  constructor() {
    effect(() => {
      console.log(this.currentList()?.list)
    });
  }
}

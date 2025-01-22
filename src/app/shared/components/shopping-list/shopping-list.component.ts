import {Component, inject, signal} from '@angular/core';
import {ShoppingListItemCardComponent} from "../shopping-list-item-card/shopping-list-item-card.component";
import {ListService} from "../../../core/services/list/list.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {from} from "rxjs";
import {ButtonModule} from "primeng/button";
import {ChipsModule} from "primeng/chips";
import {FormsModule} from "@angular/forms";
import {IListItem} from "../../interfaces/item.interface";
import {ShoppingListStatus} from "../../interfaces/list.interface";
import {ShoppingListService} from "../../services/shopping-list/shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [
    ShoppingListItemCardComponent,
    ButtonModule,
    ChipsModule,
    FormsModule,
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss'
})
export class ShoppingListComponent {
  private listService = inject(ListService);
  private shoppingListService  = inject(ShoppingListService);
  currentOpenShoppingList = toSignal(from(this.listService.currentOpenShoppingList));
  editMode = signal<boolean>(false);

  onCancelList() {
    if(this.currentOpenShoppingList()) {
      this.listService.updateListStatus(this.currentOpenShoppingList()?.id ?? 0, ShoppingListStatus.CANCELED).then(() => {
      })
    }
  }

  onCompleteList() {
    if(this.currentOpenShoppingList()) {
      this.listService.updateListStatus(this.currentOpenShoppingList()?.id ?? 0, ShoppingListStatus.COMPLETED).then(() => {
      })
    }
  }

  onEditList() {
    this.editMode.set(!this.editMode());
    if(this.currentOpenShoppingList() && !this.editMode()) {
      this.shoppingListService.updateShoppingListName(this.currentOpenShoppingList()?.id ?? 0,this.currentOpenShoppingList()?.name ?? "")
    }
  }

  updateList(item: IListItem) {
    this.shoppingListService.addItemToShoppingList(item, item.qty);
  }

  deleteItemFromList(itemId: number) {
    this.shoppingListService.deleteItemFromShoppingList(itemId);+3
  }
}

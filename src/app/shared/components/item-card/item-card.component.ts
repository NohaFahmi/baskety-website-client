import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {NgClass, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import {IItem} from "../../interfaces/item.interface";
import {SideViewsService} from "../../services/side-views/side-views.service";
import {ShoppingListService} from "../../services/shopping-list/shopping-list.service";

export enum ITEM_CARD_MODES {
  ADD = 'add',
  EDIT = 'edit',
  VIEW = 'view'
}
@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgSwitch,
    NgSwitchCase,
    CheckboxModule,
    FormsModule
  ],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss'
})
export class ItemCardComponent {
  @Input() mode?: ITEM_CARD_MODES = ITEM_CARD_MODES.ADD;
  @Input() item?: IItem;
  @Output() updateItemQuantity: EventEmitter<IItem> = new EventEmitter<IItem>();
  @Output() onRemoveItemFromList: EventEmitter<IItem> = new EventEmitter<IItem>();
  isCountExtended = false;
  checked: any;
  protected readonly ITEM_CARD_MODES = ITEM_CARD_MODES;

  constructor(public sideViewsService: SideViewsService,
              private shoppingListService: ShoppingListService) {
  }
  onEditItemCount(): void {
    this.isCountExtended = !this.isCountExtended;
  }

  viewItemDetails(itemId: string) {
    if (this.mode === ITEM_CARD_MODES.ADD) {
      this.sideViewsService.navigateToItemDetailsView(itemId);
    }
  }

  onAddingItemToList(item?: IItem) {
    // add item to list
    if (item) {
      this.shoppingListService.addItemToShoppingList(item);
    }
  }

  updateItemCountOnList(item?: IItem, increase?: boolean) {
    // update count
    if (item) {
      let quantity = item?.quantity ?? 1;
      if (increase) {
        quantity += 1;
      } else {
        quantity -= 1;
      }
      let updatedItem = item;
      updatedItem = {
        ...updatedItem,
        quantity: quantity
      }
      this.updateItemQuantity.emit(updatedItem)
    }
  }

  removeItemFromList(item?: IItem) {
    // remove item from list
    if (item) {
      this.onRemoveItemFromList.emit(item);
    }
  }
}

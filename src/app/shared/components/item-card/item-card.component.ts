import {Component, Input, signal} from '@angular/core';
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
    console.log('item', itemId);
    console.log('mode', this.mode);
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

  updateItemCountOnList(item?: IItem) {
    // update count
  }

  removeItemFromList(item?: IItem) {
    // remove item from list
  }
}

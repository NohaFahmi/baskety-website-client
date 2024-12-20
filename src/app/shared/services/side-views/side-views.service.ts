import {Injectable, signal} from '@angular/core';
import {SIDENAV_VIEWS} from "../../interfaces/common.interface";
import {IItem} from "../../interfaces/item.interface";
import {ItemService} from "../../../core/services/item/item.service";
import {ListService} from "../../../core/services/list/list.service";
import {IList} from "../../interfaces/list.interface";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable({
  providedIn: 'root'
})
export class SideViewsService {
  currentView = signal<SIDENAV_VIEWS>(SIDENAV_VIEWS.SHOPPING_LIST);
  itemDetails = signal<IItem | null>(null);
  isSideViewOpen = signal<boolean>(true);
  isEditItemMode = signal<boolean>(false);
  constructor(private itemService: ItemService,
              private shoppingListService: ShoppingListService) { }

  updateCurrentSideView(view: SIDENAV_VIEWS): void {
    this.itemDetails.set(null);
    this.isEditItemMode.set(false);
    // this.shoppingListService.getCurrentShoppingList();
    this.currentView.set(view);
  }

  navigateToItemDetailsView(itemId: string): void {
    if (itemId) {
      // this.shoppingListService.getCurrentShoppingList();
      this.itemService.getItemById(itemId).then((details) => {
        this.currentView.set(SIDENAV_VIEWS.ITEM_DETAILS);
        this.itemDetails.set(details);
        if (!this.isSideViewOpen()) {
          this.toggleDisplaySideView();
        }
      });
    }
  }

  navigateToEditItemView(itemId: string): void {
    if (itemId) {
      // this.shoppingListService.getCurrentShoppingList();
      this.itemService.getItemById(itemId).then((details) => {
        this.currentView.set(SIDENAV_VIEWS.ADD_EDIT_ITEM);
        this.itemDetails.set(details);
        this.isEditItemMode.set(true);
        if (!this.isSideViewOpen()) {
          this.toggleDisplaySideView();
        }
      })
    }
  }

  toggleDisplaySideView(): void {
    this.isSideViewOpen.update((val) => !val);
    if(this.isSideViewOpen()) {
      // this.shoppingListService.getCurrentShoppingList();
    }
  }

}

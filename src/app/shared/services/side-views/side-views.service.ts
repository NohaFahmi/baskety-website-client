import {Injectable, signal} from '@angular/core';
import {SIDENAV_VIEWS} from "../../interfaces/common.interface";
import {IItem} from "../../interfaces/item.interface";
import {ItemService} from "../../../core/services/item/item.service";

@Injectable({
  providedIn: 'root'
})
export class SideViewsService {
  currentView = signal<SIDENAV_VIEWS>(SIDENAV_VIEWS.SHOPPING_LIST);
  itemDetails = signal<IItem | null>(null);
  isSideViewOpen = signal<boolean>(false);
  constructor(private itemService: ItemService) { }

  updateCurrentSideView(view: SIDENAV_VIEWS): void {
    this.itemDetails.set(null);
    this.currentView.set(view);
  }

  navigateToItemDetailsView(itemId: string): void {
    if (itemId) {
      this.itemService.getItemById(itemId).then((details) => {
        this.currentView.set(SIDENAV_VIEWS.ITEM_DETAILS);
        this.itemDetails.set(details);
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  toggleDisplaySideView(): void {
    this.isSideViewOpen.update((val) => !val);
  }
}

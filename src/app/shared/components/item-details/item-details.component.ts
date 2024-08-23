import {Component, EventEmitter, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {SideViewsService} from "../../services/side-views/side-views.service";
import {CategoryService} from "../../../core/services/category/category.service";
import {SIDENAV_VIEWS} from "../../interfaces/common.interface";
import {ItemService} from "../../../core/services/item/item.service";
import {ShoppingListService} from "../../services/shopping-list/shopping-list.service";
import {MessageService} from "primeng/api";
import {IItem} from "../../interfaces/item.interface";

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [
    ButtonModule,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss'
})
export class ItemDetailsComponent {

  @Output() onBackInView: EventEmitter<SIDENAV_VIEWS> = new EventEmitter<SIDENAV_VIEWS>();
  @Output() onNavigateToEditView: EventEmitter<string> = new EventEmitter<string>();
  constructor(public sideViewsService: SideViewsService,
              private categoryService: CategoryService,
              private shoppingListService: ShoppingListService,
              private itemService: ItemService,
              private messageService: MessageService) {
  }

  addItemToList(item: IItem | null): void {
    if (item) {
      this.shoppingListService.addItemToShoppingList(item);
      if (this.sideViewsService.currentView() !== SIDENAV_VIEWS.SHOPPING_LIST) {
        this.sideViewsService.updateCurrentSideView(SIDENAV_VIEWS.SHOPPING_LIST);
      }
    }
  }

  getItemCategoryName(categoryId?: string): string | undefined {
    // if (this.categoryService.categoriesList().length > 0) {
    //   return this.categoryService.categoriesList().find((category) => category._id === categoryId)?.name;
    // } else {
    //   return '';
    // }
    return 's'
  }

  backInView(): void {
    this.onBackInView.emit(SIDENAV_VIEWS.SHOPPING_LIST);
  }

  deleteItem(itemId?: string): void {
    const isItemAddedIntoCurrList = !!(this.shoppingListService.currentShoppingList() &&
      this.shoppingListService.currentShoppingList()?.items?.find((item) => item._id === itemId))
    if(!isItemAddedIntoCurrList) {
      this.itemService.deleteItem(itemId??'').then(() => {
        this.onBackInView.emit(SIDENAV_VIEWS.SHOPPING_LIST);
        // this.itemService.getAllItemsGroupedByCategories().finally(() => {
        //   this.messageService.add({severity: 'success', summary: 'Success',
        //     detail: 'Item is deleted successfully!'});
        // });
      });
    } else {
      this.messageService.add({severity: 'error', summary: 'Error',
        detail: 'Can\'t delete an item that is already added into current open list!'});
    }
  }

  navigateToEditItemView(itemId?: string): void {
    this.onNavigateToEditView.emit(itemId??'');
  }
}

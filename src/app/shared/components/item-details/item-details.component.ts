import {Component, EventEmitter, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {SideViewsService} from "../../services/side-views/side-views.service";
import {CategoryService} from "../../../core/services/category/category.service";
import {SIDENAV_VIEWS} from "../../interfaces/common.interface";
import {ItemService} from "../../../core/services/item/item.service";
import {ShoppingListService} from "../../services/shopping-list/shopping-list.service";

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
              private itemService: ItemService) {
  }
  addItemToList(): void {
  }

  getItemCategoryName(categoryId?: string): string | undefined {
    if (this.categoryService.categoriesList().length > 0) {
      return this.categoryService.categoriesList().find((category) => category._id === categoryId)?.name;
    } else {
      return '';
    }
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
        this.itemService.getAllItemsGroupedByCategories();
      }).catch(() => {

      }).finally(() => {

      });
    } else {
      console.log('Item added in the current list, can not delete it');
    }
  }

  navigateToEditItemView(itemId?: string): void {
    this.onNavigateToEditView.emit(itemId??'');
  }
}

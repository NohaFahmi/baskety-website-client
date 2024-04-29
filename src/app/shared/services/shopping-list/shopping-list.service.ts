import {Injectable, signal} from '@angular/core';
import {ListService} from "../../../core/services/list/list.service";
import {IItem} from "../../interfaces/item.interface";
import {IList, ShoppingListStatus} from "../../interfaces/list.interface";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {CategoryService} from "../../../core/services/category/category.service";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  currentShoppingList = signal<IList | null>(null);

  constructor(private listService: ListService,
              private categoryService: CategoryService) { }

  addItemToShoppingList(item: IItem): void {
    if (!this.currentShoppingList()) {
      const list: IList = {
        name: 'new list',
        status: ShoppingListStatus.OPEN,
        items: [item]
      }
      this.listService.createList(list).then((list) => {
        this.currentShoppingList.set(list);
      }).catch((error) => {
        this.currentShoppingList.set(null);
      });
    }
  }

  getCurrentShoppingList(): void {
    this.listService.getCurrentOpenList().then((currentList) => {
      if(!currentList?._id) {
        this.currentShoppingList.set(null);
      } else {
        this.currentShoppingList.set(currentList);
        this.categoryService.gatAllCategories();
      }
    }).catch((error) => {
      this.currentShoppingList.set(null);
    })
  }
}

import {Injectable, signal} from '@angular/core';
import {ListService} from "../../../core/services/list/list.service";
import {IItem} from "../../interfaces/item.interface";
import {IList, IListReq, ShoppingListStatus} from "../../interfaces/list.interface";
import {CategoryService} from "../../../core/services/category/category.service";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  currentShoppingList = signal<IList | null>(null);

  constructor(private listService: ListService,
              private categoryService: CategoryService) { }

  addItemToShoppingList(item: IItem): void {
    if (this.currentShoppingList() && this.currentShoppingList()?.items) {
      const currListItems = this.currentShoppingList()?.items ?? [];
      const currListItemsIds: Set<any> = new Set(currListItems.map((item) => item._id ?? ''));
      if(currListItemsIds.has(item._id)) {
        console.log('item already added in list');
      } else {
        currListItemsIds.add(item._id ?? '');
        currListItems.push(item);
        const updatedList: IListReq = {
          items: currListItems,
          _id: this.currentShoppingList()?._id,
          status: this.currentShoppingList()?.status,
          name: this.currentShoppingList()?.name,
          userId: this.currentShoppingList()?.userId,
          completedAt: this.currentShoppingList()?.completedAt
        }
        this.updateShoppingList(updatedList);
      }

    } else {
      const items = [];
      items.push(item);
      const list: IListReq = {
        name: 'new list',
        status: ShoppingListStatus.OPEN,
        items
      }
      this.listService.createList(list).then((list) => {
        this.currentShoppingList.set(list);
      }).catch((error) => {
        this.currentShoppingList.set(null);
      });
    }
  }

  removeItemFromShoppingList(item: IItem): void {
    const currListItems = this.currentShoppingList()?.items ?? [];
    const updatedListItems = currListItems.filter((currItem) => currItem._id !== item._id);
    const updatedList: IListReq = {
      items: updatedListItems,
      _id: this.currentShoppingList()?._id,
      status: this.currentShoppingList()?.status,
      name: this.currentShoppingList()?.name,
      userId: this.currentShoppingList()?.userId,
      completedAt: this.currentShoppingList()?.completedAt
    };
    this.updateShoppingList(updatedList);
  }

  updateItemInShoppingList(item: IItem): void {
    const currListItems = this.currentShoppingList()?.items ?? [];
    const updatedItemIndex = currListItems.findIndex((currItem) => currItem._id === item._id);
    if (updatedItemIndex !== -1) {
      currListItems[updatedItemIndex] = item;
      const updatedList: IListReq = {
        items: currListItems,
        _id: this.currentShoppingList()?._id,
        status: this.currentShoppingList()?.status,
        name: this.currentShoppingList()?.name,
        userId: this.currentShoppingList()?.userId,
        completedAt: this.currentShoppingList()?.completedAt
      };
     this.updateShoppingList(updatedList);
    }
  }

  updateShoppingList(list: IList): void {
    this.listService.updateList(list._id ?? '', list).then((updatedList) => {
      this.getCurrentShoppingList();
    }).catch((error) => {
      console.log('error');
    });
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

  updateShoppingTitle(title: string): void {
    if(this.currentShoppingList()) {
      let list: any = this.currentShoppingList();
      if (list !== null) {
        list = {
          ...list,
          name: title
        }
        this.listService.updateList(this.currentShoppingList()?._id ?? '', list).then((list) => {
          this.getCurrentShoppingList();
        }).catch((error) => {
          console.log('error');
        });
      }
    }
  }
}

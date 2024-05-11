import {Injectable, signal} from '@angular/core';
import {ListService} from "../../../core/services/list/list.service";
import {IItem} from "../../interfaces/item.interface";
import {IList, IListReq, ShoppingListStatus} from "../../interfaces/list.interface";
import {CategoryService} from "../../../core/services/category/category.service";
import {MessageService} from "primeng/api";
import {SideViewsService} from "../side-views/side-views.service";
import {SIDENAV_VIEWS} from "../../interfaces/common.interface";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  currentShoppingList = signal<IList | null>(null);

  constructor(private listService: ListService,
              private categoryService: CategoryService,
              private messageService: MessageService) { }

  addItemToShoppingList(item: IItem): void {
    if (this.currentShoppingList() && this.currentShoppingList()?.items) {
      const currListItems = this.currentShoppingList()?.items ?? [];
      const currListItemsIds: Set<any> = new Set(currListItems.map((item) => item._id ?? ''));
      if(currListItemsIds.has(item._id)) {
        this.messageService.add({severity: 'error', summary: 'Error', detail: `${item.name} is already added into the current open list!`})
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
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'List is updated successfully!'})
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

  updateShoppingList(list: IList, updateCase?: any): void {
    this.listService.updateList(list._id ?? '', list).then((updatedList) => {
      this.getCurrentShoppingList();
      switch (updateCase) {
        case 'COMPLETED':
          this.messageService.add({severity: 'info', summary: 'Update', detail: `${list.name} is marked as completed!`})
          break;
        case 'CANCELED':
          this.messageService.add({severity: 'info', summary: 'Update', detail: `${list.name} is canceled!`});
          break;
        default:
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'List is updated successfully!'})
          break;
      }
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
        this.updateShoppingList(list);
      }
    }
  }
}

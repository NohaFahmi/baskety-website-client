import {inject, Injectable, signal} from '@angular/core';
import {ListService} from "../../../core/services/list/list.service";
import {ICreateListReq, IList, ShoppingListStatus} from "../../interfaces/list.interface";
import {IItem, INewItem} from "../../interfaces/item.interface";


@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private listService = inject(ListService);

  private updateCurrentList(listId: number, list: ICreateListReq) {
    return this.listService.updateList(listId, list);
  }

  private createNewShoppingList(items: INewItem[]) {
    const date = new Date();
    const month = date.toLocaleString('default', {month: 'long'});
    return this.listService.createList({
      name: `${month}'s List`,
      items: [...items]
    })
  }

  addItemToShoppingList(item: IItem, qty?: number) {
    const items = this.setShoppingListPayload(item, qty);
    const list = this.listService.currentOpenShoppingList.value;
    if (items) {
      if (list) {
        this.updateCurrentList(list.id, {
          items,
          name: list.name,
        });
      } else {
        this.createNewShoppingList(items);
      }
    }
  }

  deleteItemFromShoppingList(id: number) {
    const list = this.listService.currentOpenShoppingList.value;
    const items: INewItem[] = list?.items.filter((item) => item.id !== id).map((item) => ({
      itemId: item.id,
      qty: item.qty
    })) ?? [];
    if (list) {
      this.updateCurrentList(list.id, {
        items,
        name: list.name,
      });
    }
  }

  updateShoppingListName(listId: number, name: string) {
      return this.listService.updateListName(listId, name);
  }

  private setListItems() {
    const list = this.listService.currentOpenShoppingList.value;
    return list?.items.map((listItem) => ({
      itemId: listItem.id,
      qty: listItem.qty
    })) ?? [] as INewItem[];
  }

  private setShoppingListPayload(item: IItem, qty?: number) {
    if (item.id) {
      const items: INewItem[] = this.setListItems();
      if (items?.length) {
        const existedItemIndex = items.findIndex((listItem) => listItem.itemId === item.id);
        if (existedItemIndex !== -1) {
          if (qty) {
            items[existedItemIndex].qty = qty;
          } else {
            items[existedItemIndex].qty += 1;
          }
        } else {
          items.push({itemId: item.id, qty: qty ? qty : 1});
        }
      } else {
        items.push({itemId: item.id, qty: qty ? qty : 1});
      }
      return items;
    }
    return null;
  }
}

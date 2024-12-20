import {Injectable, signal} from '@angular/core';
import {ListService} from "../../../core/services/list/list.service";
import {IList, ShoppingListStatus} from "../../interfaces/list.interface";


@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor(private listService: ListService) { }

  createNewShoppingList(list: IList): Promise<any> {
    return this.listService.createList(list);
  }

  // updateShoppingList(list: IList) {
  //   if (this.currentShoppingList() && this.currentShoppingList()?.id) {
  //     return this.listService.updateList(this.currentShoppingList()?.id ?? 0,
  //       list);
  //   } else {
  //     return this.createNewShoppingList(list);
  //   }
  // }
  // updateShoppingListStatus(listId: number, listStatus: ShoppingListStatus) {
  //   return this.listService.updateListStatus(listId, listStatus);
  // }
}

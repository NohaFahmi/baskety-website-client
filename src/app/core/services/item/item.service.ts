import {Injectable, signal, Signal} from '@angular/core';
import {HttpService} from "../http/http.service";
import {lastValueFrom} from "rxjs";
import {IItem, IItemList} from "../../../shared/interfaces/item.interface";
import {sign} from "chart.js/helpers";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  groupedItems = signal<IItemList[]>([]);
  constructor(private httpService: HttpService) { }

  getAllItems(): Promise<IItem[]> {
    return lastValueFrom(this.httpService.get('item'))
  }
  getAllItemsGroupedByCategories(): Promise<IItemList[]> {
    return new Promise((resolve, reject) => {
      lastValueFrom(this.httpService.get('item/grouped')).then((groupedItems) => {
        this.groupedItems.set(groupedItems);
        resolve(groupedItems);
      }).catch((error) => {
        reject(error);
      })
    })
  }
  getItemById(itemId: string): Promise<IItem> {
    return lastValueFrom(this.httpService.get(`item/${itemId}`))
  }

  createItem(item: IItem): Promise<IItem> {
    return lastValueFrom(this.httpService.post(`item`, item));
  }

  updateItem(item: IItem): Promise<IItem> {
    return lastValueFrom(this.httpService.put(`item/${item._id}`, item));
  }
  deleteItem(itemId: string): Promise<IItem> {
    return lastValueFrom(this.httpService.delete(`item/${itemId}`));
  }
}

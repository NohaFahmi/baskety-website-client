import {Injectable, signal, Signal} from '@angular/core';
import {HttpService} from "../http/http.service";
import {firstValueFrom, lastValueFrom} from "rxjs";
import {IItem} from "../../../shared/interfaces/item.interface";
import {sign} from "chart.js/helpers";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private httpService: HttpService) { }

  getAllItems(): Promise<IItem[]> {
    return lastValueFrom(this.httpService.get('items'))
  }
  getAllItemsByCategoryId(id: number): Promise<IItem[]> {
    return lastValueFrom(this.httpService.get(`items/byCategory/${id}`))
  }

  getItemById(itemId: string): Promise<IItem> {
    return lastValueFrom(this.httpService.get(`item/${itemId}`))
  }

  createItem(item: IItem): Promise<IItem> {
    return lastValueFrom(this.httpService.post(`item`, item));
  }

  addManyItems(categoryId: string, items: IItem[]): Promise<IItem[]> {
    const formData = new FormData();
    formData.append("categoryId", categoryId);
    formData.append("items", JSON.stringify(items));
    return firstValueFrom(this.httpService.post('item/bulk', formData))
  }
  updateItem(item: IItem): Promise<IItem> {
    return lastValueFrom(this.httpService.put(`item/`, item));
  }
  deleteItem(itemId: string): Promise<IItem> {
    return lastValueFrom(this.httpService.delete(`item/${itemId}`));
  }
}

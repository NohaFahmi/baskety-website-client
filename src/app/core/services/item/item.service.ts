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

  getItemById(itemId: number): Promise<IItem> {
    return lastValueFrom(this.httpService.get(`items/${itemId}`))
  }

  createItem(item: IItem): Promise<IItem> {
    return lastValueFrom(this.httpService.post(`items`, item));
  }

  addManyItems(categoryId: string, items: IItem[]): Promise<IItem[]> {
    // const formData = new FormData();
    // formData.append("categoryId", categoryId);
    // formData.append("items", JSON.stringify(items));
    return firstValueFrom(this.httpService.post('items/bulk', {
      categoryId,
      items
    }))
  }
  updateItem(itemId: number, item: IItem): Promise<IItem> {
    return lastValueFrom(this.httpService.put(`items/${itemId}`, item));
  }
  deleteItem(itemId: number): Promise<IItem> {
    return lastValueFrom(this.httpService.delete(`items/${itemId}`));
  }
}

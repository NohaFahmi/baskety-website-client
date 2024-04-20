import { Injectable } from '@angular/core';
import {HttpService} from "../http/http.service";
import {lastValueFrom} from "rxjs";
import {IItem} from "../../../shared/interfaces/item.interface";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpService: HttpService) { }

  getAllItems(): Promise<IItem[]> {
    return lastValueFrom(this.httpService.get('item'))
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

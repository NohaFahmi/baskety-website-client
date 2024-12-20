import { Injectable } from '@angular/core';
import {HttpService} from "../http/http.service";
import {firstValueFrom, lastValueFrom} from "rxjs";
import {IList, IListReq, ShoppingListStatus} from "../../../shared/interfaces/list.interface";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  constructor(private httpService: HttpService) { }
  getUserListsHistory(): Promise<IList[]> {
    return firstValueFrom(this.httpService.get('lists/history'))
  }
  getCurrentOpenList(): Promise<{list:IList}> {
    return firstValueFrom(this.httpService.get('lists/current'))
  }
  getListDetailsById(listId: number): Promise<IList> {
    return firstValueFrom(this.httpService.get(`lists/${listId}`))
  }
  createList(list: IList): Promise<IList> {
    return firstValueFrom(this.httpService.post('lists/create', list));
  }
  updateList(listId: number, list: IListReq): Promise<any> {
      return lastValueFrom(this.httpService.put(`lists/update/${listId}`, list));
  }
  updateListStatus(listId: number, listStatus: ShoppingListStatus): Promise<any> {
      return firstValueFrom(this.httpService.put(`lists/status/update/${listId}`, listStatus));
  }
  deleteList(listId: number): Promise<IList> {
      return firstValueFrom(this.httpService.delete(`lists/${listId}`));
  }

}

import { Injectable } from '@angular/core';
import {HttpService} from "../http/http.service";
import {lastValueFrom} from "rxjs";
import {IList, IListReq} from "../../../shared/interfaces/list.interface";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  constructor(private httpService: HttpService) { }
  getUserListsHistory(): Promise<IList[]> {
    return lastValueFrom(this.httpService.get('list/history'))
  }
  getCurrentOpenList(): Promise<IList> {
    return lastValueFrom(this.httpService.get('list/current'))
  }
  getListDetailsById(listId: string): Promise<IList> {
    return lastValueFrom(this.httpService.get(`list/${listId}`))
  }
  createList(list: IListReq): Promise<IList> {
    return lastValueFrom(this.httpService.post('list', list));
  }
  updateList(listId: string, list: IListReq): Promise<any> {
      return lastValueFrom(this.httpService.put(`list/${listId}`, list));
  }
  deleteList(listId: string): Promise<IList> {
      return lastValueFrom(this.httpService.delete(`list/${listId}`));
  }

}

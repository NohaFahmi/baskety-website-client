import {inject, Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {BehaviorSubject, firstValueFrom} from "rxjs";
import {ICreateListReq, IList, ShoppingListStatus} from "../../../shared/interfaces/list.interface";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private httpService = inject(HttpService);
  currentOpenShoppingList = new BehaviorSubject<IList | null>(null);

  getUserListsHistory(): Promise<IList[]> {
    return firstValueFrom(this.httpService.get('lists/history'))
  }

  getCurrentOpenList(): Promise<IList | null> {
    return new Promise((resolve, reject) => {
      firstValueFrom(this.httpService.get('lists/current')).then(({list}) => {
        if(list.id) {
          this.currentOpenShoppingList.next(list);
          resolve(list)
        } else {
          this.currentOpenShoppingList.next(null);
          resolve(null)
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }

  getListDetailsById(listId: number): Promise<IList> {
    return firstValueFrom(this.httpService.get(`lists/${listId}`))
  }

  createList(list: ICreateListReq): Promise<IList> {
    return new Promise((resolve, reject) => {
      firstValueFrom(this.httpService.post('lists/create', list)).then(({list}) => {
        this.currentOpenShoppingList.next(list);
        resolve(list.list)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  updateList(listId: number, list: ICreateListReq): Promise<any> {
    return new Promise((resolve, reject) => {
      firstValueFrom(this.httpService.put(`lists/update/${listId}`, list)).then(({list}) => {
        this.currentOpenShoppingList.next(list);
        resolve(list.list)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  updateListStatus(listId: number, listStatus: ShoppingListStatus): Promise<any> {
    return new Promise((resolve, reject) => {
      firstValueFrom(this.httpService.put(`lists/status/update/${listId}`, {
        status: listStatus
      })).then((list) => {
        this.currentOpenShoppingList.next(null)
        resolve({list})
      }).catch((error) => {
        reject(error)
      })
    });
  }

  updateListName(listId: number, listName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firstValueFrom(this.httpService.put(`lists/name/update/${listId}`, {
        name: listName
      })).then((list) => {
       console.log('list', list);
        resolve({list})
      }).catch((error) => {
        reject(error)
      })
    })
  }
  deleteList(listId: number): Promise<IList> {
      return firstValueFrom(this.httpService.delete(`lists/${listId}`));
  }

}

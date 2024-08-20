import { Injectable } from '@angular/core';
import {IUser} from "../../../shared/interfaces/user.interface";
import {firstValueFrom, Observable} from "rxjs";
import {HttpService} from "../http/http.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }

  saveUserInDB(userInfo: IUser): Promise<IUser> {
    return firstValueFrom(this.httpService.post('users', userInfo));
  }

  getUserFromDBByUid(): Promise<any> {
    return firstValueFrom(this.httpService.get(`users/byUid`));
  }
  updateUserInDB(userInfo: IUser): Promise<any> {
    return firstValueFrom(this.httpService.put(`users}`, userInfo));
  }

  deleteUserFromDB(): Promise<any> {
    return firstValueFrom(this.httpService.delete(`users`));
  }
}

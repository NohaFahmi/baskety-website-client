import { Injectable } from '@angular/core';
import {HttpService} from "../http/http.service";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpService: HttpService) { }

  gatAllCategories(): Promise<any> {
    return lastValueFrom(this.httpService.get('category'));
  }
}

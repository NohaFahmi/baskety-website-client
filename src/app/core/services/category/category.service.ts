import { Injectable } from '@angular/core';
import {HttpService} from "../http/http.service";
import {lastValueFrom} from "rxjs";
import {ICategory} from "../../../shared/interfaces/category.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpService: HttpService) { }

  gatAllCategories(): Promise<ICategory[]> {
    return lastValueFrom(this.httpService.get('category'));
  }
}

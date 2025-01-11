import {Injectable, signal, Signal} from '@angular/core';
import {HttpService} from "../http/http.service";
import {BehaviorSubject, firstValueFrom, lastValueFrom} from "rxjs";
import {ICategory} from "../../../shared/interfaces/category.interface";
import {IItem} from "../../../shared/interfaces/item.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoriesList = new BehaviorSubject<ICategory[] | null>(null);
  constructor(private httpService: HttpService) { }
  gatAllCategories(): Promise<ICategory[]> {
    return new Promise((resolve, reject) => {
      if (this.categoriesList.value) {
        resolve(this.categoriesList.value);
      } else {
        lastValueFrom(this.httpService.get('categories')).then((categories) => {
          this.categoriesList.next(categories)
          resolve(categories);
        }).catch((error) => {
          this.categoriesList.next(null);
          reject(error);
        });
      }

    });
  }
}

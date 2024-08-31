import {Injectable, signal, Signal} from '@angular/core';
import {HttpService} from "../http/http.service";
import {firstValueFrom, lastValueFrom} from "rxjs";
import {ICategory} from "../../../shared/interfaces/category.interface";
import {IItem} from "../../../shared/interfaces/item.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoriesList = signal<ICategory[]>([]);
  constructor(private httpService: HttpService) { }
  gatAllCategories(): Promise<ICategory[]> {
    return firstValueFrom(this.httpService.get('categories'))
    // return new Promise((resolve, reject) => {
    //   if (this.categoriesList().length > 0) {
    //     resolve(this.categoriesList());
    //   } else {
    //     lastValueFrom(this.httpService.get('category')).then((categories) => {
    //       this.categoriesList.set(categories);
    //       resolve(categories);
    //     }).catch((error) => {
    //       this.categoriesList.set([]);
    //       reject(error);
    //     });
    //   }
    //
    // });
  }
}

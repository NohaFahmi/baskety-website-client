import {inject, Injectable, signal, Signal} from '@angular/core';
import {HttpService} from "../http/http.service";
import {BehaviorSubject, firstValueFrom, lastValueFrom} from "rxjs";
import {ICategory} from "../../../shared/interfaces/category.interface";
import {IItem} from "../../../shared/interfaces/item.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private httpService = inject(HttpService);
  categoriesList = new BehaviorSubject<ICategory[] | null>(null);

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

  createCategory(category: ICategory): Promise<ICategory> {
    return firstValueFrom(this.httpService.post('categories', category));
  }

  deleteCategory(id: number): Promise<void> {
    return firstValueFrom(this.httpService.delete(`categories/${id}`));
  }
}

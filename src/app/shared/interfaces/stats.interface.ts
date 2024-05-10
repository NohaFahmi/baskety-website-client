import {IItem} from "./item.interface";
import {ICategory} from "./category.interface";

export interface IStats {
  topItems: {count: number, item: IItem}[],
  topCategories: {count: number, category: ICategory}[],
  summary?: any;
}

export interface IItem {
  id?: number;
  name: string;
  description: string;
  imgUrl?: string;
  price: number;
  qtyUnit: string;
  category?: string;
  // quantityUnit:string;
  categoryId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IItemList {
  categoryName: string[];
  items: IItem[]
}

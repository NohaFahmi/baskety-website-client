export interface IItem {
  id?: number;
  name: string;
  description: string;
  imageURL?: string;
  price: number;
  quantity: number;
  category?: string;
  quantityUnit:string;
  categoryId?: string;
}

export interface IItemList {
  categoryName: string[];
  items: IItem[]
}

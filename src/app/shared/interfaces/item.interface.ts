export interface IItem {
  id?: number;
  name: string;
  description?: string;
  imgUrl?: string;
  price?: number;
  qtyUnit?: string;
  updatedAt?: string;
  createdAt?: string;
  categoryId?: number;
}

export interface IListItem {
  itemId: number;
  qty: number,
  listId: number;
  id: number;
  price: number;
  qtyUnit: string;
  imgUrl: string;
  name?:string;
}

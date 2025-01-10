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

export interface IListItem extends IItem{
  listItemId?: number;
  qty: number,
  listId?: number;
  id: number;
  price: number;
  qtyUnit: string;
  imgUrl: string;
}

export interface INewItem {
  itemId: number;
  qty: number;
}

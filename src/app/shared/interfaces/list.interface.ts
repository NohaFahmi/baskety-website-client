import {IItem, IListItem} from "./item.interface";

export enum ShoppingListStatus {
  CANCELED = 'cancelled',
  COMPLETED = 'completed',
  OPEN = 'open',
}
export interface IList {
  id?: number;
  name?: string;
  status?: ShoppingListStatus;
  completedAt?: Date;
  userId?: string;
  items?: IListItem[];
  updatedAt?: string;
  totalCost: number;
}
export interface IListReq {
  _id?: string;
  name?: string;
  status?: ShoppingListStatus;
  completedAt?: Date;
  userId?: string;
  items?: IListItem[];
}


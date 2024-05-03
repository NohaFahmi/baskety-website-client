import {IItem} from "./item.interface";

export enum ShoppingListStatus {
  OPEN = 'open',
  COMPLETED = 'completed',
  CANCELLED = 'canceled'
}
export interface IList {
  _id?: string;name?: string;
  status?: ShoppingListStatus;
  completedAt?: Date;
  userId?: string;
  items?: IItem[];
}
export interface IListReq {
  _id?: string;
  name?: string;
  status?: ShoppingListStatus;
  completedAt?: Date;
  userId?: string;
  items?: string[];
}


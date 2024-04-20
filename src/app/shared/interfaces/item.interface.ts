export interface IItem {
  _id?: string;
  name: string;
  description: string;
  imageURL?: string;
  price: number;
  quantity: number;
  category: string;
  quantityUnit:string;
}

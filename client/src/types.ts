export interface IBrand {
  _id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface IProduct {
  _id: string;
  name: string;
  quantity: number;
  brands: IBrand[];
}

export interface IList {
  _id: string;
  name: string;
  content: IProduct[];
}

export interface IBestPrice {
  quantity: number;
  price: number;
}

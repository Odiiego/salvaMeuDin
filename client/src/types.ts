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
  bestMetrics: {
    costPerUnit: { quantity: number; value: number };
    costProjection: { quantity: number; value: number };
  };
}

export interface IList {
  _id: string;
  name: string;
  content: IProduct[];
}

export interface IMetrics {
  price: number | null;
  costPerUnit?: number | null;
  costProjection?: number | null;
}

export interface IFormStatus {
  addBrandForm: string | null;
  updateProductForm: string | null;
}

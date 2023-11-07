export type Pizza = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  variants: [{
    size: number;
    price: number;
  }];
  category: number;
  rating: number;
}

export enum PizzaFetchStatus {
  LOADING = 'loading',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

export interface PizzaSliceState {
  items: Pizza[],
  qtyPages: number;
  totalServerItems: number;
  status: PizzaFetchStatus;
}

export type FetchPizzasArgs = string;
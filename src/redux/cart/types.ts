export type cartPizzaItem = {
  id: number;
  imageUrl: string;
  title: string;
  category: number;
  rating: number;
  variant: {
    size: number;
    price: number;
    type: number;
    typeTitle: string;
  };
  count: number;
}

export interface CartSliceState {
  items: cartPizzaItem[];
  totalPrice: number;
  totalQuantity: number;
}
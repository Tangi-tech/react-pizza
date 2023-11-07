import { cartPizzaItem } from "../redux/cart/types"

export const calcTotalQuantity = (items: cartPizzaItem[]) => {
  return items.reduce((sum: number, item: cartPizzaItem) => item.count + sum, 0)
}
import { cartPizzaItem } from "../redux/cart/types"

export const calcTotalPrice = (items: cartPizzaItem[]) => {
    return items.reduce((sum, item) => sum + (item.count * item.variant.price), 0)
}
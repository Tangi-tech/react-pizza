import { RootState } from "../store"

export const selectCartItems = (state: RootState) => { 
  return state.cart.items
}
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { calcTotalQuantity } from '../../utils/calcTotalQuantity';

import { CartSliceState, cartPizzaItem } from './types';


const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<cartPizzaItem>) => {
      let isAdded = false
      state.items.forEach((item) => {
        if (item.id === action.payload.id 
          && item.variant.type === action.payload.variant.type 
          && item.variant.size === action.payload.variant.size) {
            item.count += 1
            state.totalPrice = calcTotalPrice(state.items)
            state.totalQuantity = calcTotalQuantity(state.items)
            isAdded = true;
        } 
      })
      if (!isAdded) {
        state.items.push({...action.payload, count: 1})
        state.totalPrice = calcTotalPrice(state.items)
        state.totalQuantity = calcTotalQuantity(state.items)
      }
    },
    addFromLocalStorage: (state, action: PayloadAction<cartPizzaItem[]>) => {
      state.items = action.payload
      state.totalPrice = calcTotalPrice(state.items)
      state.totalQuantity = calcTotalQuantity(state.items)
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1)
      state.totalPrice = calcTotalPrice(state.items)
      state.totalQuantity = calcTotalQuantity(state.items)
    },
    deleteAllItems: (state) => { 
      state.items = initialState.items
      state.totalPrice = initialState.totalPrice
      state.totalQuantity = initialState.totalQuantity
    },
    countMinus: (state, action: PayloadAction<number>) => {
      state.items[action.payload].count -= 1
      state.totalPrice = calcTotalPrice(state.items)
      state.totalQuantity = calcTotalQuantity(state.items)
    },
    countPlus: (state, action: PayloadAction<number>) => {
      state.items[action.payload].count += 1
      state.totalPrice = calcTotalPrice(state.items)
      state.totalQuantity = calcTotalQuantity(state.items)
    }
  },
})



export const { addProduct, removeItem, countMinus, countPlus, deleteAllItems, addFromLocalStorage } = cartSlice.actions

export default cartSlice.reducer
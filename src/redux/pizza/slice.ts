import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PizzaFetchStatus, PizzaSliceState } from './types';
import { fetchPizzas } from './asyncActions'

const initialState: PizzaSliceState = {
  items: [],
  qtyPages: 1,
  totalServerItems: 0,
  status: PizzaFetchStatus.LOADING,
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setQtyPages: (state, action: PayloadAction<number>) => {
      state.qtyPages = action.payload
    },
    setTotalServerItems: (state, action: PayloadAction<number>) => {
      state.totalServerItems = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = PizzaFetchStatus.LOADING
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = PizzaFetchStatus.FULFILLED
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = []
      state.status = PizzaFetchStatus.REJECTED
    })
  }
})

export const { setQtyPages, setTotalServerItems } = pizzaSlice.actions

export default pizzaSlice.reducer
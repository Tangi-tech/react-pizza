import { createSlice } from '@reduxjs/toolkit'

export const paginationSlice = createSlice({
  currentPage: 1,
  qtyPages: 1,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload  
    },
    setQtyPages: (state, action) => {
      state.qtyPages = action.payload
    },
  },
})


export const { setCurrentPage, setQtyPages} = paginationSlice.actions

export default paginationSlice.reducer
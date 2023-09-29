import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    pagination: {
      currentPage: 1,
      qtyPages: 1,
      limitOnPage: 8
    },
    currentCategory: {
      title: 'Все',
      index: -1
    },
    currentSort: {
      title: 'популярности',
      sort: 'rating'
    },
    sortOrder: true,
  },
  reducers: {
    setCategory: (state, action) => {
      state.currentCategory.title = action.payload.title
      state.currentCategory.index = action.payload.index
    },
    setSort: (state, action) => {
      state.currentSort.title = action.payload.title
      state.currentSort.sort = action.payload.sort
    },
    setOrder: (state) => {
      state.sortOrder = !state.sortOrder
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload  
    },
    setQtyPages: (state, action) => {
      state.pagination.qtyPages = action.payload
    },
    setFilters: (state, action) => {
      state.pagination.currentPage = Number(action.payload._page)
      if (action.payload.categoryObj !== undefined) {
        state.currentCategory = action.payload.categoryObj
      }
      state.currentSort = action.payload.sortObj
      console.log('action', action)
    }
  },
})


export const { setCategory, setSort, setOrder, setCurrentPage, setQtyPages, setFilters } = filterSlice.actions

export default filterSlice.reducer
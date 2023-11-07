import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Category, FilterSliceState, Sort } from './types'


const initialState: FilterSliceState = {
    pagination: {
      currentPage: 1,
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
    searchValue: ''
  }

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category>) => {
      state.currentCategory.title = action.payload.title
      state.currentCategory.index = action.payload.index
    },
    setSort: (state, action: PayloadAction<Sort>) => {
      state.currentSort.title = action.payload.title
      state.currentSort.sort = action.payload.sort
    },
    setOrder: (state) => {
      state.sortOrder = !state.sortOrder
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload  
    },
    setFilters: (state, action: PayloadAction<any>) => {
      
      if (action.payload.categoryObj !== undefined) {
        state.currentCategory = action.payload.categoryObj
      }
      if (action.payload.page !== undefined && !isNaN(action.payload.page)) {
        state.pagination.currentPage = Number(action.payload.page)
      }
      if (action.payload.sortObj !== undefined) {
        state.currentSort = action.payload.sortObj
      }
      const order = action.payload.order === 'asc' ? false : true
      state.sortOrder = order
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    setHomePage: (state) => {
      state.currentCategory = initialState.currentCategory
      state.pagination.currentPage = initialState.pagination.currentPage
      state.searchValue = ''
    }
  },
})


export const { setCategory, setSort, setOrder, setCurrentPage, setFilters, setSearchValue, setHomePage } = filterSlice.actions

export default filterSlice.reducer
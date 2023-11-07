import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../store';

import { FetchPizzasArgs, Pizza } from './types';
import { setQtyPages, setTotalServerItems } from './slice';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzas',
  async (route: FetchPizzasArgs, { getState, dispatch }) => {
    const axiosData = await axios.get<Pizza[]>(`http://localhost:3001/items?${route}`)
    const limitOnPage = (getState() as RootState).filter.pagination.limitOnPage
    const { paginationQtyPages, totalServerItems } = getPaginationQty(limitOnPage, axiosData)

    dispatch(setQtyPages(paginationQtyPages))
    dispatch(setTotalServerItems(totalServerItems))
    
    return axiosData.data
  }
)
const getPaginationQty = (limitOnPage: number, axiosData: any) => {
  const totalServerItems: number = Number(axiosData.headers.get('X-Total-Count'))
  const paginationQtyPages: number = Math.ceil(totalServerItems/limitOnPage)

  return { paginationQtyPages, totalServerItems }
}
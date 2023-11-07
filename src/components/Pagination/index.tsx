import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setCurrentPage } from '../../redux/filter/slice'

import styles from './Pagination.module.scss'

export const Pagination: React.FC = () => {
  const dispatch = useDispatch()
  const qtyPages = useSelector((state: any) => state.pizza.qtyPages)
  const currentPage = useSelector((state: any) => state.filter.pagination.currentPage)

  const checkPaginationPage = (newPage: number) => {
    if (newPage > qtyPages) {
      dispatch(setCurrentPage(1))
    } else if (newPage < 1) {
      dispatch(setCurrentPage(qtyPages))
    } else {
      dispatch(setCurrentPage(newPage))
    }
  }

  return (
    <div className={styles.root}>
      <ul className={styles.ul}>
        <li 
        className={styles.li + ' ' + styles.back}
        onClick={() => checkPaginationPage(currentPage - 1) }>{'<'}</li>
        {
          [...Array(qtyPages)].map((_, index) => {
            return <li 
              key={index} 
              className={`${styles.li} ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => dispatch(setCurrentPage(index + 1))}>
              {index + 1}
            </li>
          })
        }
        <li 
          className={styles.li + ' ' + styles.forward} 
          onClick={() => checkPaginationPage(currentPage + 1) }>{'>'}
        </li>
      </ul>
    </div>
  )
}

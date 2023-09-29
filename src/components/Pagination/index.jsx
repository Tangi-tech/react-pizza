import { useSelector, useDispatch } from 'react-redux'

import { setCurrentPage } from '../../redux/slices/filterSlice'

import styles from './Pagination.module.scss'

const Pagination = () => {
  const dispatch = useDispatch()
  const qtyPages = useSelector((state) => state.filter.pagination.qtyPages)
  const currentPage = useSelector((state) => state.filter.pagination.currentPage)

  const checkPaginationPage = (newPage) => {
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

export default Pagination
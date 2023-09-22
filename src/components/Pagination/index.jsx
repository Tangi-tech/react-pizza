import styles from './Pagination.module.scss'

const Pagination = ({ currentPage, setCurrentPage, paginationBtnQty, checkPaginationPage}) => {
  
  return (
    <div className={styles.root}>
      <ul className={styles.ul}>
        <li 
        className={styles.li + ' ' + styles.back}
        onClick={() => checkPaginationPage(currentPage - 1) }>{'<'}</li>
        {
          [...Array(paginationBtnQty)].map((_, index) => {
            return <li 
              key={index} 
              className={`${styles.li} ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(index + 1)}>
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
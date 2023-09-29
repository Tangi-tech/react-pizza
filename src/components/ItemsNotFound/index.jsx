import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCurrentPage } from '../../redux/slices/filterSlice'

import styles from './ItemsNotFound.module.scss'

const ItemsNotFound = ({ onHomePageClick }) => {
  const dispatch = useDispatch()

  const onClickShowAll = () => {
    onHomePageClick()
    dispatch(setCurrentPage(1))
  }

  return (
    <div className={styles.root}>
      <h1 className={styles.heading}>Извините, пиццы не найдены 😕</h1>
      <p className={styles.text}>Попробуйте изменить поиск.</p>
      <Link to="/" onClick={() => onClickShowAll()}>
        <button className={'button ' + styles.btn}>Показать все пиццы?</button>
      </Link>
    </div>
  )
}

export default ItemsNotFound
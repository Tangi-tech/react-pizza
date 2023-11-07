import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setHomePage } from '../../redux/filter/slice'

import styles from './ItemsNotFound.module.scss'

export const ItemsNotFound: React.FC = () => {
  const dispatch = useDispatch()

  const onClickShowAll = () => {
    dispatch(setHomePage())
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

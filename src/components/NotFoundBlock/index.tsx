import React from 'react'
import { Link } from 'react-router-dom'

import styles from './NotFoundBlock.module.scss'

export const NotFoundBlock: React.FC = () => {

  return (
    <div className={styles.root}>
      <h1 className={styles.heading}>Not found 😕</h1>
      <p className={styles.text}>So sorry, but this page doesn't exist.</p>
      <Link to="/">
        <button className={'button ' + styles.btn}>На главную</button>
      </Link>
    </div>
  )
}

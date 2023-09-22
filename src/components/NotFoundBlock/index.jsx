import { Link } from 'react-router-dom'

import styles from './NotFoundBlock.module.scss'

const NotFoundBlock = () => {

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

export default NotFoundBlock
import styles from './Search.module.scss'
import deleteIcon from '../../assets/img/cancel_close_delete_icon.svg'

const Search = ({ inputValue, setInputValue }) => {

  return (
    <div className={styles.root + ' search-bar'}>
      <svg className={styles.icon} fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
      
      <input className={styles.input} placeholder='Поиск пиццы...' onChange={event => setInputValue(event.target.value)} value={inputValue}/>
      {
        inputValue && <img className={styles.deleteIcon} src={deleteIcon} alt="close" onClick={() => setInputValue('')}/>
      }
    </div>

  )
}

export default Search
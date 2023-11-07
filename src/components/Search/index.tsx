import { useRef, useCallback, useState, useEffect, FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'

import { setSearchValue } from '../../redux/filter/slice'

import styles from './Search.module.scss'
import deleteIcon from '../../assets/img/cancel_close_delete_icon.svg'

export const Search: FC = () => {
  const dispatch = useDispatch()
  const inputValue = useSelector((state: any) => state.filter.searchValue)

  const [inputLocalValue, setInputLocalValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setInputLocalValue(inputValue)
  }, [inputValue])
  
  const onClickDelete = () => {
    dispatch(setSearchValue(''))
    setInputLocalValue('')
    inputRef.current?.focus()
  }
  const updateSearchValue = useCallback(
    debounce((value: string) => dispatch(setSearchValue(value)), 
    500, 
    [])
  , [])
  const onChangeInput = (value: string) => { 
    updateSearchValue(value)
    setInputLocalValue(value)
  }
  return (
    <div className={styles.root + ' search-bar'}>
      <svg className={styles.icon} fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
      
      <input 
        ref={inputRef}
        className={styles.input} 
        placeholder='Поиск пиццы...' 
        onChange={event => onChangeInput(event.target.value)} 
        value={inputLocalValue}
      />
      {
        inputValue && <img className={styles.deleteIcon} src={deleteIcon} alt="close" onClick={onClickDelete}/>
      }
    </div>

  )
}

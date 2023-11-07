import { useState, useRef, useEffect, MouseEvent, FC, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSort, setOrder } from '../../redux/filter/slice'

type sortMethodsType = {
  title: string;
  sort: 'rating' | 'entryPrice' | 'title';
}

export const sortMethods: sortMethodsType[] = [
  {title: 'популярности',
  sort: 'rating'},
  {title: 'цене',
  sort: 'entryPrice'},
  {title: 'алфавиту',
  sort: 'title'}
]

export const Sort: FC = memo(() => {
  const popupRef = useRef<HTMLDivElement>(null)

  const currentSort = useSelector((state: any) => state.filter.currentSort)
  const sortOrder = useSelector((state: any) => state.filter.sortOrder)
  const dispatch = useDispatch()

  const [isVisiblePopup, setIsVisiblePopup] = useState(false)

  useEffect(() => {
    const eventHandler = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        path: Node[];
        composedPath: Function;
      }
      
      let path = _event.composedPath ? _event.composedPath() : _event.path;
      if (!path.includes(popupRef.current)) {
        setIsVisiblePopup(false)
      }
    }
    // @ts-ignore
    document.body.addEventListener('click', eventHandler)
    // @ts-ignore
    return () => document.body.removeEventListener('click', eventHandler)
  }, [])


  const onClickSort = (method: sortMethodsType) => {
    dispatch(setSort(method))
    setIsVisiblePopup(false)
  }

  return (
    <div className="sort" ref={popupRef}>
      <div className="sort__label">
        <div onClick={() => dispatch(setOrder())}>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            transform={sortOrder ? '' : "rotate(180)"}
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <b>Сортировка по:</b>
        </div>
        <span onClick={() => setIsVisiblePopup(prev => !prev)}>{currentSort.title}</span>
      </div>
      { isVisiblePopup ? 
      <div className="sort__popup">
        <ul>
        {
          sortMethods.map((method, index) => (
            <li
              key={index}
              className={method.title === currentSort.title ? 'active' : ''}
              onClick={() => onClickSort(method)}
            >
              {method.title}
            </li>
          ))
        }
        </ul>
      </div> : 
      ''
      }
  </div>
  )
})

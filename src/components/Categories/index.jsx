
import { useSelector, useDispatch } from 'react-redux'

import { setCategory, setCurrentPage } from '../../redux/slices/filterSlice'

export const categories = [
  {title: 'Все',
  index: -1},
  {title: 'Мясные',
  index: 0},
  {title: 'Вегетарианские',
  index: 1},
  {title: 'Гриль',
  index: 2},
  {title: 'Острые',
  index: 3},
  {title: 'Закрытые',
  index: 4}
]

const Categories = () => {
  const currentCategory = useSelector(state => state.filter.currentCategory.index)
  const dispatch = useDispatch()


  const onClickCategory = (category) => {
    dispatch(setCategory(category))
    dispatch(setCurrentPage(1))
  }

  return (
    <div className="categories">
      <ul>
        {
          categories.map((category) => (
            <li key={category.index} 
            className={ currentCategory === category.index ? "active" : ''} 
            onClick={() => onClickCategory(category)}>{category.title}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default Categories
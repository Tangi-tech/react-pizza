
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'

// import { useWhyDidYouUpdate } from 'ahooks';

import { setCategory, setCurrentPage } from '../../redux/filter/slice'

type CategoryType = {
  title: string;
  index: number;
}

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

export const Categories: React.FC = React.memo(() => {
  const currentCategory = useSelector((state: any) => state.filter.currentCategory.index)
  const dispatch = useDispatch()
  // useWhyDidYouUpdate('CategoriesComponent', {currentCategory})
  const onClickCategory = (category: CategoryType) => {
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
})

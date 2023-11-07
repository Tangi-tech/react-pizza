import { useEffect, useRef, FC } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'

import { Categories, Sort, Skeleton, PizzaBlock, Pagination, ItemsNotFound } from '../../components'
// import Categories from '../../components/Categories'
// import Sort from '../../components/Sort' 
// import Skeleton from '../../components/PizzaBlock/Skeleton'
// import PizzaBlock from '../../components/PizzaBlock'
// import Pagination from '../../components/Pagination'
// import ItemsNotFound from '../../components/ItemsNotFound'

import { sortMethods } from '../../components/Sort'
import { categories } from '../../components/Categories'

import { setFilters } from '../../redux/filter/slice'
import { SetFiltersType } from '../../redux/filter/types'
import { fetchPizzas } from '../../redux/pizza/asyncActions'
import { RootState, useAppDispatch } from '../../redux/store'

const Home: FC = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const isSearchParamFilled = useRef(false)
  const isFirstRender = useRef(false)

  const inputValue = useSelector((state: RootState) => state.filter.searchValue)
  const currentCategory = useSelector((state: RootState) => state.filter.currentCategory.index)
  const { sortOrder, currentSort } = useSelector((state: RootState) => state.filter)
  const { currentPage, limitOnPage } = useSelector((state: RootState) => state.filter.pagination)
  const status = useSelector((state: RootState) => state.pizza.status)
  const totalServerItems = useSelector((state: RootState) => state.pizza.totalServerItems)
  const pizzaItems = useSelector((state: RootState) => state.pizza.items)

  const findRoute = () => {
    let findCategory = currentCategory >= 0 ? 'category=' + currentCategory : ''
    let findSort = `&_sort=${currentSort.sort}`
    let findOrder = `&_order=${sortOrder ? 'desc' : 'asc'}` 
    let findSearch = inputValue ? `&title_like=${inputValue}` : '' 
    let findPagination = `&_page=${currentPage}`
    let findPaginationLimit = `&_limit=${limitOnPage}`

    return {
      findCategory,
      findSort,
      findOrder,
      findPagination,
      findSearch,
      findPaginationLimit
    }
  }

  const fetchItems = () => {
    const { 
      findCategory,
      findSort,
      findOrder,
      findPagination,
      findSearch,
      findPaginationLimit } = findRoute()

    const route: string = `${findCategory + findSort + findOrder + findPagination + findPaginationLimit + findSearch}`

    dispatch(
       fetchPizzas(route)
    )

    window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sortObj = sortMethods.find(obj => obj.sort === params._sort)
      const categoryObj = categories.find(obj => obj.index === Number(params.category))

      const paramsObj: SetFiltersType = {
        order: params._order?.toString(),
        page: Number(params._page),
        sortObj,
        categoryObj
      }
      dispatch(setFilters(
        {
          ...paramsObj,
        }
      ))
      isSearchParamFilled.current = true
    }
  }, [])
  
  useEffect(() => {
    if (isFirstRender.current) {
      const { 
        findCategory,
        findSort,
        findOrder,
        findPagination,
        findSearch} = findRoute()
      const route = `${findCategory + findSort + findOrder + findPagination + findSearch}`
      navigate(`?${route}`)
    }
    
    isFirstRender.current = true
  }, [currentCategory, currentSort, sortOrder, inputValue, currentPage])

  useEffect(() => {
    if(!isSearchParamFilled.current) {
      fetchItems()
    }

    isSearchParamFilled.current = false
  }, [currentCategory, currentSort, sortOrder, inputValue, currentPage])

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">
        {pizzaItems.length < 1 && inputValue ? 
          <ItemsNotFound 
          /> 
        : `Все пиццы`}
      </h2>
      <div className="content__items">
      { status === 'rejected' ? 'Пиццы не найдены, что то пошло не так. Обновите страницу.' :
          status === 'loading' ? 
          [...Array(8)].map((_, index) => (
            <Skeleton key={index} />))
          : pizzaItems.map((obj: any) => (
            <PizzaBlock key={obj.id} {...obj}/>))
      }
      </div>
      { pizzaItems.length < 1 || totalServerItems <= limitOnPage ? '' :
        <Pagination />
      }
    </div>
  )
}

export default Home
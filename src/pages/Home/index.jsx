import { useEffect, useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'
import axios from 'axios'

import Categories from '../../components/Categories'
import Sort from '../../components/Sort'
import Skeleton from '../../components/PizzaBlock/Skeleton'
import PizzaBlock from '../../components/PizzaBlock'
import Pagination from '../../components/Pagination'
import ItemsNotFound from '../../components/ItemsNotFound'

import { sortMethods } from '../../components/Sort'
import { categories } from '../../components/Categories'

import { SearchContext } from '../../App'
import { setQtyPages, setFilters } from '../../redux/slices/filterSlice'

let paginationQtyPages = 0
let totalServerItems = 0

const Home = () => {
  const navigate = useNavigate()
  const { inputValue, onHomePageClick } = useContext(SearchContext)
  const dispatch = useDispatch()

  const currentCategory = useSelector((state) => state.filter.currentCategory.index)
  const { sortOrder, currentSort } = useSelector(state => state.filter)
  const { currentPage, limitOnPage } = useSelector(state => state.filter.pagination)

  const [pizzaItems, setPizzaItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
  
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      console.log(params)
      const sortObj = sortMethods.find(obj => obj.sort === params._sort)
      const categoryObj = categories.find(obj => obj.index == params.category)
      console.log(sortObj)
      console.log('category1234', categoryObj)
      dispatch(setFilters(
        {
          ...params,
          sortObj,
          categoryObj
        }
      ))
    }
  }, [])

  useEffect(() => {
    const { 
      findCategory,
      findSort,
      findOrder,
      findPagination,
      findSearch,
      findPaginationLimit } = findRoute()

    const route = `${findCategory + findSort + findOrder + findPagination + findPaginationLimit + findSearch}`
    const fetchPizzaItems = async () => {
      setIsLoading(true)
      const axiosData = await axios
      .get(`http://localhost:3001/items?${route}`)

      totalServerItems = axiosData.headers.get('X-Total-Count')
      paginationQtyPages = Math.ceil(totalServerItems/limitOnPage)
      
      dispatch(setQtyPages(paginationQtyPages))
      setTimeout(() => {
        setIsLoading(false)
        setPizzaItems(axiosData.data)
      }, 300)
    }
    window.scrollTo(0, 0)
    fetchPizzaItems()
  }, [currentCategory, currentSort, sortOrder, inputValue, currentPage])

  useEffect(() => {
    const { 
      findCategory,
      findSort,
      findOrder,
      findPagination,
      findSearch} = findRoute()
    const route = `${findCategory + findSort + findOrder + findPagination + findSearch}`
    navigate(`?${route}`)
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
            onHomePageClick={onHomePageClick} 
          /> 
        : `Все пиццы`}
      </h2>
      <div className="content__items">
      {
        isLoading ? 
        [...Array(8)].map((_, index) => (
          <Skeleton key={index} />))
        : pizzaItems.map((obj) => (
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
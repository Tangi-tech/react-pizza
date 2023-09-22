import { useEffect, useState } from 'react'
import axios from 'axios'

import Categories from '../../components/Categories'
import Sort from '../../components/Sort'
import Skeleton from '../../components/PizzaBlock/Skeleton'
import PizzaBlock from '../../components/PizzaBlock'
import Pagination from '../../components/Pagination'
import ItemsNotFound from '../../components/ItemsNotFound'

let paginationQtyPages = 0
let totalServerItems = 0

const Home = ({ inputValue, onHomePageClick }) => {
  const [pizzaItems, setPizzaItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeType, setActiveType] = useState(-1)
  const [sortOrder, setSortOrder] = useState(true)
  const [currentSort, setCurrentSort] = useState(
    {title: 'популярности',
    sort: 'rating'})

  const [currentPage, setCurrentPage] = useState(1)
  const [paginationBtnQty, setPaginationBtnQty] = useState(1)

  const limitOnPage = 4
  
  useEffect(() => {
    let findCategory = activeType >= 0 ? 'category=' + activeType : ''
    let findSort = `&_sort=${currentSort.sort}`
    let findOrder = `&_order=${sortOrder ? 'desc' : 'asc'}` 
    let findSearch = inputValue ? `&title_like=${inputValue}` : ''
    let findPagination = `&_page=${currentPage}&_limit=${limitOnPage}`

    const fetchPizzaItems = async () => {
      setIsLoading(true)
      const axiosData = await axios.get(`http://localhost:3001/items?${findCategory + findSort + findOrder + findPagination + findSearch}`)

      totalServerItems = axiosData.headers.get('X-Total-Count')
      paginationQtyPages = Math.ceil(totalServerItems/limitOnPage)
      
      setPaginationBtnQty(paginationQtyPages)
      setTimeout(() => {
        setIsLoading(false)
        setPizzaItems(axiosData.data)
      }, 300)
    }
    window.scrollTo(0, 0)
    fetchPizzaItems()
  }, [activeType, currentSort, sortOrder, inputValue, currentPage])

  const checkPaginationPage = (newPage) => {
    if (newPage > paginationQtyPages) {
      setCurrentPage(1)
    } else if (newPage < 1) {
      setCurrentPage(paginationQtyPages)
    } else {
      setCurrentPage(newPage)
    }
  }


  return (
    <div className="container">
      <div className="content__top">
        <Categories 
          activeType={activeType} 
          setActiveType={setActiveType}
          setCurrentPage={setCurrentPage}
        />
        <Sort 
          currentSort={currentSort} 
          setCurrentSort={setCurrentSort} 
          setSortOrder={() => setSortOrder(prev => !prev)}
          sortOrder={sortOrder}
        />
      </div>
      <h2 className="content__title">
        {pizzaItems.length < 1 && inputValue ? <ItemsNotFound setActiveType={setActiveType} onHomePageClick={onHomePageClick} setCurrentPage={setCurrentPage}/> : `Все пиццы`}
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
        <Pagination 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          paginationBtnQty={paginationBtnQty}
          checkPaginationPage={checkPaginationPage}
        /> 
      }
    </div>
  )
}

export default Home
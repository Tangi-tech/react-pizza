
const Categories = ( {activeType, setActiveType, setCurrentPage} ) => {
  const categories = [
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

  const onClickCategory = (index) => {
    setActiveType(index)
    setCurrentPage(1)
  }

  return (
    <div className="categories">
      <ul>
        {
          categories.map((category) => (
            <li key={category.index} 
            className={ activeType === category.index ? "active" : ''} 
            onClick={() => onClickCategory(category.index)}>{category.title}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default Categories
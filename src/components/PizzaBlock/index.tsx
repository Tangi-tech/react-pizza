import { useState, FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { addProduct } from '../../redux/cart/slice'
import { selectCartItems } from '../../redux/cart/selectors'

import { cartPizzaItem } from '../../redux/cart/types'

type PizzaBlockProps = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  variants: [{
    size: number;
    price: number;
  }];
  category: number;
  rating: number;
}

export const PizzaBlock: FC<PizzaBlockProps> = ({ id, imageUrl, title, types, variants, category, rating }) => {
  const pizzaTypes = ['тонкое', 'традиционное']

  const dispatch = useDispatch()
  
  const count = useSelector(selectCartItems).filter((item: cartPizzaItem) => item.id === id)
  const amountItems = count.reduce((sum: number, item: cartPizzaItem) => sum + item.count, 0)
  
  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)

  const onClickActiveType = (index: number) => {
    setActiveType(index)
  }
  const onClickActiveSize = (index: number) => {
    setActiveSize(index)
  }

  const onClickAdd = () => {
    const product: cartPizzaItem = {
      id,
      imageUrl,
      title,
      category,
      rating, 
      variant: {
        size: variants[activeSize].size,
        price: variants[activeSize].price,
        type: activeType,
        typeTitle: pizzaTypes[activeType]
      },
      count: 0,
    }
    dispatch(addProduct(product))
  }

  return (
    <div className="pizza-block">
      <Link to={'pizza/' + id}>
        <img
          className="pizza-block__image"
          src={imageUrl}
          alt="Pizza"
        />
        <h4 className="pizza-block__title">{title}</h4>
      </Link >
      <div className="pizza-block__selector">
        <ul>
          {
            types.map((type, index) => 
            (<li 
              className={activeType === index ? "active" : ''} 
              onClick={() => onClickActiveType(index)}
              key={index}>
                {pizzaTypes[type]}
            </li>)) 
          }
        </ul>
        <ul>
          {
            variants.map((variant, index) => 
            (<li 
              key={index}
              className={activeSize === index ? "active" : ''}
              onClick={() => onClickActiveSize(index)}>
                {variant.size} см.
            </li>))
          }
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {variants[activeSize].price} ₽</div>
        <button className="button button--outline button--add" 
        onClick={() => onClickAdd()}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {amountItems ? <i>{amountItems}</i> : ''}
        </button>
      </div>
  </div> 
  )
}

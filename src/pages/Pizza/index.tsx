import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import axios from 'axios'

export const Pizza = () => {
  const navigate = useNavigate()
  const [pizza, setPizza] = useState<{
    title: string;
    imageUrl: string;
  }>()
  const { id } = useParams()
  useEffect(() => {
    
      const fetchPizza = async () => {
        try {
          const { data } = await axios.get(`http://localhost:3001/items/${id}`)
          console.log(data)
          setPizza(data)
        } catch (error) {
          alert('Ошибка, такой пиццы нет!')
          navigate('/')
        }
      }
      fetchPizza()
  }, [])

  if (!pizza) {
    return <>Загрузка...</>
  }

  return (
    <div>{pizza.title}</div>
  )
}

export default Pizza
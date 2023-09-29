import { Routes, Route } from 'react-router-dom'
import { useState, createContext } from 'react'
import { useDispatch } from 'react-redux'

import { setCategory } from './redux/slices/filterSlice'

import Header from './components/Header'
import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'

import './scss/app.scss';

export const SearchContext = createContext()

function App() {
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()

  const onHomePageClick = () => {
    setInputValue('')
    dispatch(setCategory({
      title: 'Все',
      index: -1
    }))
  }

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{
        inputValue, 
        setInputValue, 
        onHomePageClick}}
      >
        <Header />
        <div className="content">
            <Routes>
              <Route path="/">
                <Route index element={<Home />}/>
                <Route path="cart" element={<Cart/>}/>
                <Route path="*" element={<NotFound />}/>
              </Route>
            </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;

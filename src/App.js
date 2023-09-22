import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import Header from './components/Header'
import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'

import './scss/app.scss';

function App() {

  const [inputValue, setInputValue] = useState('')

  const onHomePageClick = () => {
    setInputValue('')
  }

  return (
    <div className="wrapper">
      <Header inputValue={inputValue} setInputValue={setInputValue} onHomePageClick={onHomePageClick}/>
      <div className="content">
          <Routes>
            <Route path="/">
              <Route index element={<Home inputValue={inputValue} onHomePageClick={onHomePageClick}/>}/>
              <Route path="cart" element={<Cart/>}/>
              <Route path="*" element={<NotFound />}/>
            </Route>
          </Routes>
      </div>
    </div>
  );
}

export default App;

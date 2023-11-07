import { Routes, Route } from 'react-router-dom'

import loadable from '@loadable/component'

import Home from './pages/Home'
import NotFound from './pages/NotFound'
import MainLayout from './layouts/MainLayout'

import './scss/app.scss';

const Cart = loadable(() => import(`./pages/Cart`))
const Pizza = loadable(() => import(`./pages/Pizza`))

// const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'))
// const Pizza = React.lazy(() => import(/* webpackChunkName: "Pizza" */ './pages/Pizza'))

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />}/>
        <Route path="cart" element={
          <Cart fallback={<div>Загрузка корзнины...</div>}/>
        }>
        </Route>
        <Route path="pizza/:id" element={
          <Pizza fallback={<div>Загрузка пиццы...</div>}/>
        }>
        </Route>
        <Route path="*" element={<NotFound />}/>
      </Route>
    </Routes>
  );
}

export default App;



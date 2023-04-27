import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'
import ItemDetailsContainer from './components/ItemDetailsContainer'
import Cart from './components/Cart'
import CartContextProvider from './components/CartContext'
import Checkout from './components/Checkout'

function App() {
  return (
    <CartContextProvider>
      <BrowserRouter>
        <NavBar />
        <div
          style={{
            width: '90%',
            maxWidth: 1200,
            margin: '0 auto',
          }}
        >
          <Routes>
            <Route path='/' Component={ItemListContainer} />
            <Route path='/category/:categoryId' Component={ItemListContainer} />
            <Route path='/item/:itemId' Component={ItemDetailsContainer} />
            <Route path='/cart' Component={Cart} />
            <Route path='/checkout' Component={Checkout} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartContextProvider>
  )
}

export default App

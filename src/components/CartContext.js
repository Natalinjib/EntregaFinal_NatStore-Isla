import { createContext, useState } from 'react'

export const CartContext = createContext()

const CartContextProvider = (props) => {
  const { children } = props
  const [cart, setCart] = useState()

  const addItem = (item) => {
    const { id, ...restAttributes } = item
    if (!cart)
      return setCart({
        [id]: restAttributes,
      })

    if (!cart[id])
      return setCart((lastCart) => ({
        ...lastCart,
        [id]: restAttributes,
      }))

    const currentQuantity = cart[id].quantity
    setCart((lastCart) => ({
      ...lastCart,
      [id]: {
        ...lastCart[id],
        quantity: currentQuantity + restAttributes.quantity,
      },
    }))
  }
  const removeItem = (itemId) => {
    const updatedCart = {
      ...cart,
    }

    delete updatedCart[itemId]
    setCart(updatedCart)
  }
  const clearCart = () => setCart()
  const isInCart = (itemId) => Boolean(cart[itemId])
  const getTotalItems = () => {
    if (!cart) return 0
    return Object.values(cart).reduce((total, item) => total + item.quantity, 0)
  }
  const getCartAsArray = () => {
    if (!cart) return []
    return Object.entries(cart).map(([id, data]) => ({
      id,
      ...data,
    }))
  }
  const getTotalPrice = () => {
    if (!cart) return 0

    return Object.values(cart).reduce(
      (total, item) => total + item.quantity * item.price,
      0
    )
  }
  const getItemsBrief = () => {
    if (!cart) return []
    return Object.entries(cart).map(([id, data]) => {
      const { title, price, quantity } = data

      return {
        id,
        title,
        price,
        quantity,
      }
    })
  }
  const getItemQuantities = () => {
    if (!cart) return {}

    return Object.keys(cart).reduce((stocks, itemId) => {
      stocks[itemId] = cart[itemId].quantity
      return stocks
    }, {})
  }

  return (
    <CartContext.Provider
      value={{
        addItem,
        removeItem,
        clearCart,
        isInCart,
        getTotalItems,
        getCartAsArray,
        getTotalPrice,
        getItemsBrief,
        getItemQuantities,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider

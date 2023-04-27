import { useContext } from 'react'
import { Button, ListGroup, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from './CartContext'

const Cart = () => {
  const { getCartAsArray, getTotalPrice, removeItem, clearCart } =
    useContext(CartContext)
  const cart = getCartAsArray()
  const navigate = useNavigate()

  return (
    <>
      <h1
        style={{
          marginBottom: 24,
        }}
      >
        Artículos
      </h1>
      {cart.length === 0 ? (
        <>
          No hay artículos en el carrito de compras.
          <Link
            to='/'
            style={{
              marginLeft: 4,
            }}
          >
            Volver al inicio
          </Link>
        </>
      ) : (
        <>
          <ListGroup>
            {getCartAsArray().map((item) => (
              <ListGroup.Item key={item.id}>
                <Stack direction='horizontal' gap={3}>
                  <img
                    alt={item.title}
                    src={item.imageUrl}
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: 'cover',
                    }}
                  />
                  <Stack gap={2} className='me-auto'>
                    <h5>{item.title}</h5>
                    <div>
                      <b>Cantidad:</b> {item.quantity}
                    </div>
                    <div>
                      <b>Precio:</b> S/. {item.price}
                    </div>
                  </Stack>
                  <Button variant='danger' onClick={() => removeItem(item.id)}>
                    Eliminar artículo
                  </Button>
                </Stack>
              </ListGroup.Item>
            ))}
            <ListGroup.Item
              style={{
                fontSize: 18,
              }}
            >
              <Stack direction='horizontal' gap={2}>
                <span>
                  <b>Total a pagar:</b>
                </span>
                <span
                  style={{
                    marginLeft: 8,
                  }}
                  className='me-auto'
                >
                  S/. {getTotalPrice()}
                </span>
                <Button variant='danger' onClick={clearCart}>
                  Eliminar carrito
                </Button>
                <Button onClick={() => navigate('/checkout')}>
                  Terminar mi compra
                </Button>
              </Stack>
            </ListGroup.Item>
          </ListGroup>
        </>
      )}
    </>
  )
}

export default Cart

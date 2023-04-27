import React, { useContext, useState } from 'react'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { CartContext } from './CartContext'
import ItemCount from './ItemCount'

const ItemDetail = (props) => {
  const { id, title, description, imageUrl, price, stock } = props
  const [settledQuantity, setSettledQuantity] = useState(false)
  const navigate = useNavigate()
  const { addItem } = useContext(CartContext)

  const addItemsToCart = (quantity) => {
    addItem({
      id,
      title,
      price,
      quantity,
      imageUrl,
    })
    setSettledQuantity(true)
  }
  const goToCheckout = () => navigate('/cart')

  return (
    <Container fluid='sm'>
      <Row className='justify-content-center'>
        <Col xs='auto'>
          <img
            style={{
              padding: 16,
              borderRadius: 6,
              border: '1px solid #e3e3e3',
              width: '100%',
              height: '100%',
              maxWidth: 400,
              maxHeight: 400,
              objectFit: 'cover',
            }}
            alt={title}
            src={imageUrl}
          />
        </Col>
        <Col sm={12} lg={5}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              minWidth: 300,
              gap: 16,
              width: '100%',
            }}
          >
            <h1>{title}</h1>
            <span>{description}</span>
            <h6>Precio: S/. {price}</h6>
            <h6>Stock: {stock} unidades</h6>
            {settledQuantity ? (
              <Stack gap={3}>
                <Button variant='success' onClick={goToCheckout}>
                  Ir a pagar
                </Button>
                <Button variant='link' onClick={() => navigate('/')}>
                  Seguir comprando
                </Button>
              </Stack>
            ) : (
              <ItemCount stock={stock} addItemsToCart={addItemsToCart} />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ItemDetail

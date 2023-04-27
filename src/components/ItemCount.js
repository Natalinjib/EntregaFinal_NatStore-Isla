import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const ItemCount = (props) => {
  const { stock, addItemsToCart, quantity } = props
  const [counter, setCounter] = useState(0)
  const navigate = useNavigate()

  const incrementCounter = () => setCounter(counter + 1)
  const decrementCounter = () => setCounter(counter - 1)
  const addItems = () => addItemsToCart(counter)

  return (
    <div
      style={{
        backgroundColor: '#F8F9FA',
        padding: 16,
        borderRadius: 6,
        display: 'grid',
        gap: 16,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 4,
          border: '1px solid #d9d9d9',
        }}
      >
        <Button
          variant='link'
          disabled={counter <= 0}
          onClick={decrementCounter}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-dash'
            viewBox='0 0 16 16'
          >
            <path d='M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z' />
          </svg>
        </Button>
        <span
          style={{
            margin: '0 48px',
            flexGrow: 1,
            textAlign: 'center',
          }}
        >
          {counter}
        </span>
        <Button
          variant='link'
          disabled={counter >= stock}
          onClick={incrementCounter}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-plus'
            viewBox='0 0 16 16'
          >
            <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
          </svg>
        </Button>
      </div>
      <Button
        variant='primary'
        disabled={counter === 0}
        style={{
          width: '100%',
        }}
        onClick={addItems}
      >
        Agregar al carrito
      </Button>
      <Button variant='outline-secondary' onClick={() => navigate(-1)}>
        Volver
      </Button>
    </div>
  )
}

export default ItemCount

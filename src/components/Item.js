import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Item = (props) => {
  const { id, title, imageUrl, price, description } = props
  const navigate = useNavigate()

  return (
    <div
      style={{
        placeSelf: 'center',
        display: 'grid',
        border: '2px solid #e3e3e3',
        gap: 8,
        padding: 16,
      }}
    >
      <img
        style={{
          width: '100%',
          objectFit: 'cover',
          height: 200,
        }}
        alt={title}
        src={imageUrl}
      />
      <h5 style={{ textAlign: 'center' }}>{title}</h5>
      <span>{description}</span>
      <h6 style={{ textAlign: 'center' }}>S/. {price}</h6>
      <Button variant='outline-primary' onClick={() => navigate(`/item/${id}`)}>
        Ver detalle
      </Button>
    </div>
  )
}

export default Item

import { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from './CartContext'
import {
  addDoc,
  collection,
  doc,
  documentId,
  getDocs,
  getFirestore,
  query,
  where,
  writeBatch,
} from 'firebase/firestore'

const Checkout = () => {
  const {
    getTotalItems,
    getItemsBrief,
    getTotalPrice,
    clearCart,
    getItemQuantities,
  } = useContext(CartContext)
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [generatedOrderId, setGeneratedOrderId] = useState()
  const [loading, setLoading] = useState()
  const navigate = useNavigate()
  const totalItems = getTotalItems()

  const generateOrder = async (event) => {
    try {
      event.preventDefault()

      if (fullName.length === 0 || phone.length === 0 || email.length === 0)
        return alert('Debe rellenar todos los campos')

      setLoading(true)
      const items = getItemsBrief()
      const order = {
        buyer: {
          fullName,
          phone,
          email,
        },
        items,
        date: new Date().toISOString(),
        total: getTotalPrice(),
      }

      // Generamos la orden
      const db = getFirestore()
      const ordersCollection = collection(db, 'orders')
      const generatedOrder = await addDoc(ordersCollection, order)

      // Obtenemos los documentos actuales de los productos
      const itemQuantities = getItemQuantities()
      const filters = items.map((item) => where(documentId(), '==', item.id))
      const q = query(collection(db, 'products'), ...filters)
      const snapshot = await getDocs(q)

      // Hacemos una actualización en batch por cada
      // documento en nuestra lista de artículos
      const batch = writeBatch(db)
      snapshot.docs.forEach((d) =>
        batch.update(doc(db, 'products', d.id), {
          stock: d.data().stock - itemQuantities[d.id],
        })
      )
      batch.commit()

      setGeneratedOrderId(generatedOrder.id)
      clearCart()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return generatedOrderId ? (
    <>
      <div>
        <h1
          style={{
            marginBottom: 32,
          }}
        >
          Compra registrada exitosamente
        </h1>
        <span>
          Tu código de orden generada es <b>{generatedOrderId}</b>.
        </span>
      </div>
      <Button
        disabled={loading}
        style={{
          marginTop: 24,
        }}
        onClick={() => navigate('/')}
      >
        Volver al inicio
      </Button>
    </>
  ) : totalItems === 0 ? (
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
      <h1
        style={{
          marginBottom: 32,
        }}
      >
        Genera tu orden
      </h1>
      <span>
        Ingresa tus datos personales para poder generar la orden y finalizar con
        la compra.
      </span>
      <Form
        onSubmit={generateOrder}
        style={{
          maxWidth: 500,
          marginTop: 24,
        }}
      >
        <Form.Group className='mb-3' controlId='formBasicName'>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            disabled={loading}
            type='text'
            placeholder='Juan Perez'
            onChange={(event) => setFullName(event.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            disabled={loading}
            type='email'
            placeholder='foo@baz.com'
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPhone'>
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            disabled={loading}
            type='phone'
            placeholder='987654321'
            onChange={(event) => setPhone(event.target.value)}
          />
        </Form.Group>
        <Button disabled={loading} variant='primary' type='submit'>
          Generar orden
        </Button>
      </Form>
    </>
  )
}

export default Checkout

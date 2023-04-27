import { doc, getDoc, getFirestore } from 'firebase/firestore'
import React, { useCallback, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import ItemDetail from './ItemDetail'

const ItemDetailsContainer = () => {
  const { itemId } = useParams()
  const [item, setItem] = useState()
  const [loading, setLoading] = useState(false)

  const fetchItem = useCallback(async () => {
    try {
      setLoading(true)
      const db = getFirestore()

      const itemRef = doc(db, 'products', itemId)
      const snapshot = await getDoc(itemRef)

      if (snapshot.exists()) {
        setItem({
          id: snapshot.id,
          ...snapshot.data(),
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [itemId])

  useEffect(() => {
    fetchItem()
  }, [fetchItem])

  return loading || !item ? (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <Spinner />
    </div>
  ) : (
    <ItemDetail {...item} />
  )
}

export default ItemDetailsContainer

import React, { useCallback, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import ItemList from './ItemList'
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
import { useParams } from 'react-router-dom'

const categoryTitles = {
  tech: 'Tecnología',
  man: 'Ropa Hombres',
  woman: 'Ropa Mujeres',
}

const ItemListContainer = () => {
  const { categoryId } = useParams()
  const [items, setItems] = useState()
  const [loading, setLoading] = useState(false)

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true)
      const db = getFirestore()

      let q = query(collection(db, 'products'))

      if (categoryId)
        q = query(
          collection(db, 'products'),
          where('categoryId', '==', categoryId)
        )

      const snapshot = await getDocs(q)

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setItems(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [categoryId])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  return loading || !items ? (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <Spinner />
    </div>
  ) : (
    <>
      <h1
        style={{
          marginBottom: 32,
        }}
      >
        {categoryTitles[categoryId] ?? 'Todos los productos'}
      </h1>
      <ItemList items={items} />
    </>
  )
}

export default ItemListContainer

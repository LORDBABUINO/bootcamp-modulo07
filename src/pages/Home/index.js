import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdAddShoppingCart } from 'react-icons/md'

import api from '../../services/api'
import { addToCartRequest } from '../../store/modules/cart/actions'
import { formatPrice } from '../../util/format'

import { ProductList } from './styles'

function Home() {
  const [products, setProducts] = useState([])
  const amount = useSelector(state =>
    state.cart.reduce((amounts, { id, amount: productAmount }) => {
      amounts[id] = productAmount

      return amounts
    }, {})
  )
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      const response = await api.get('products')
      const data = response.data.map(product => ({
        ...product,
        priceFormated: formatPrice(product.price),
      }))
      setProducts(data)
    })()
  }, [])

  function handleAddProduct(id) {
    dispatch(addToCartRequest(id))
  }

  return (
    <ProductList>
      {products.map(({ id, image, title, priceFormated }) => (
        <li key={id}>
          <img src={image} alt={title} />
          <strong>{title}</strong>
          <span>{priceFormated}</span>

          <button type="button" onClick={async () => handleAddProduct(id)}>
            <div>
              <MdAddShoppingCart size={16} color="white" /> {amount[id] || 0}
            </div>
            <span>adicionar ao carrinho</span>
          </button>
        </li>
      ))}
    </ProductList>
  )
}

export default Home

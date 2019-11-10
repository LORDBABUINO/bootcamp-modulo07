import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { MdAddShoppingCart } from 'react-icons/md'
import { func, number, objectOf } from 'prop-types'

import api from '../../services/api'
import * as CartActions from '../../store/modules/cart/actions'
import { formatPrice } from '../../util/format'

import { ProductList } from './styles'

function Home({ amount, addToCartRequest }) {
  const [products, setProducts] = useState([])

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
    addToCartRequest(id)
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

const mapStateToProps = state => ({
  amount: state.cart.reduce((anAmount, { id, amount }) => {
    anAmount[id] = amount

    return anAmount
  }, {}),
})

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch)

Home.propTypes = {
  addToCartRequest: func.isRequired,
  amount: objectOf(number).isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

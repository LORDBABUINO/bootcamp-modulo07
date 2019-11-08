import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { arrayOf, shape, func, string, number } from 'prop-types'
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md'

import { formatPrice } from '../../util/format'
import * as CartActions from '../../store/modules/cart/actions'
import { Container, ProductTable, Total } from './styles'

function Cart({ cart, total, removeFromCart, updateAmount }) {
  const increment = (id, amount) => {
    updateAmount(id, amount + 1)
  }
  const decrement = (id, amount) => {
    updateAmount(id, amount - 1)
  }
  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>produto</th>
            <th>qtd</th>
            <th>subtotal</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(({ id, image, title, formatedPrice, amount, subtotal }) => (
            <tr key={title}>
              <td>
                <img src={image} alt={title} />
              </td>
              <td>
                <strong>{title}</strong>
                <span>{formatedPrice}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(id, amount)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={amount} />
                  <button type="button" onClick={() => increment(id, amount)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{subtotal}</strong>
              </td>
              <td>
                <button type="button" onClick={() => removeFromCart(id)}>
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Finalizar pedido</button>
        <Total>
          <span>total</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  )
}

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch)

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce((total, { price, amount }) => total + price * amount, 0)
  ),
})

Cart.propTypes = {
  cart: arrayOf(
    shape({
      id: number,
      title: string,
      price: number,
      formatedPrice: number,
      image: string,
      amount: number,
    })
  ).isRequired,
  removeFromCart: func.isRequired,
  updateAmount: func.isRequired,
  total: number.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)

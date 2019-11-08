import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { arrayOf, shape, func, string, number } from 'prop-types'
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md'

import * as CartActions from '../../store/modules/cart/actions'
import { Container, ProductTable, Total } from './styles'

function Cart({ cart, removeFromCart, updateAmount }) {
  const increment = (id, amount) => {
    updateAmount(id, amount + 1)
  }
  const decrement = (id, amount) => {
    updateAmount(id, amount - 1)
  }
  /**/
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
          {cart.map(({ id, image, title, price, amount }) => (
            <tr key={title}>
              <td>
                <img src={image} alt={title} />
              </td>
              <td>
                <strong>{title}</strong>
                <span>{price}</span>
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
                <strong>R$258,80</strong>
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
          <strong>R$1920,28</strong>
        </Total>
      </footer>
    </Container>
  )
}

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch)

const mapStateToProps = state => ({
  cart: state.cart,
})

Cart.propTypes = {
  cart: arrayOf(
    shape({
      id: number,
      title: string,
      price: string,
      image: string,
      amount: number,
    })
  ).isRequired,
  removeFromCart: func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)

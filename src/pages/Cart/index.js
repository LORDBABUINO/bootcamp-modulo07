import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md'

import { formatPrice } from '../../util/format'
import {
  updateAmountRequest,
  removeFromCart,
} from '../../store/modules/cart/actions'

import { Container, ProductTable, Total } from './styles'

function Cart() {
  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    }))
  )
  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((sum, { price, amount }) => sum + price * amount, 0)
    )
  )
  const dispatch = useDispatch()
  const increment = (id, amount) => {
    dispatch(updateAmountRequest(id, amount + 1))
  }
  const decrement = (id, amount) => {
    dispatch(updateAmountRequest(id, amount - 1))
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
          {cart.map(
            ({ id, image, title, priceFormatted, amount, subtotal }) => (
              <tr key={id}>
                <td>
                  <img src={image} alt={title} />
                </td>
                <td>
                  <strong>{title}</strong>
                  <span>{priceFormatted}</span>
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
                  <button
                    type="button"
                    onClick={() => dispatch(removeFromCart(id))}
                  >
                    <MdDelete size={20} color="#7159c1" />
                  </button>
                </td>
              </tr>
            )
          )}
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

export default Cart

import React from 'react'
import { connect } from 'react-redux'
import { arrayOf, shape, func, string, number } from 'prop-types'
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md'

import { Container, ProductTable, Total } from './styles'

function Cart({ cart, dispatch }) {
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
            <tr>
              <td>
                <img src={image} alt={title} />
              </td>
              <td>
                <strong>{title}</strong>
                <span>{price}</span>
              </td>
              <td>
                <div>
                  <button type="button">
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly="" value={amount} />
                  <button type="button">
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>R$258,80</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'REMOVE_FROM_CART', id })}
                >
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
  dispatch: func.isRequired,
}

const mapStateToProps = state => ({
  cart: state.cart,
})

export default connect(mapStateToProps)(Cart)

import React, { Component } from 'react'
import { MdAddShoppingCart } from 'react-icons/md'
import api from '../../services/api'
import { formatPrice } from '../../util/format'

import { ProductList } from './styles'

export default class Home extends Component {
  state = {
    products: [],
  }

  async componentDidMount() {
    const response = await api.get('products')
    const data = response.data.map(product => ({
      ...product,
      price: formatPrice(product.price),
    }))
    this.setState({ products: data })
  }

  render() {
    const { products } = this.state
    return (
      <ProductList>
        {products.map(({ id, image, title, price }) => (
          <li key={id}>
            <img src={image} alt={title} />
            <strong>{title}</strong>
            <span>{price}</span>

            <button type="button">
              <div>
                <MdAddShoppingCart size={16} color="white" /> 3
              </div>
              <span>adicionar ao carrinho</span>
            </button>
          </li>
        ))}
      </ProductList>
    )
  }
}

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MdAddShoppingCart } from 'react-icons/md'
import { func } from 'prop-types'
import api from '../../services/api'
import { formatPrice } from '../../util/format'

import { ProductList } from './styles'

class Home extends Component {
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

  handleAddProduct = async product => {
    const { dispatch } = this.props
    dispatch({
      type: 'ADD_TO_CART',
      product,
    })
  }

  render() {
    const { products } = this.state
    return (
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.price}</span>

            <button
              type="button"
              onClick={async () => this.handleAddProduct(product)}
            >
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

Home.propTypes = {
  dispatch: func.isRequired,
}

export default connect()(Home)

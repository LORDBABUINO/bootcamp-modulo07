import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { MdShoppingBasket } from 'react-icons/md'
import { number } from 'prop-types'

import { Container, Cart } from './styles'

import logo from '../../assets/images/logo.svg'

function Header({ cartSize }) {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>
      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cartSize} itens</span>
        </div>
        <MdShoppingBasket size={36} color="white" />
      </Cart>
    </Container>
  )
}

Header.propTypes = {
  cartSize: number.isRequired,
}

export default connect(state => ({
  cartSize: state.cart.length,
}))(Header)
